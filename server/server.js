// Create Server
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// Connect DB
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DB;

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.9qfvn8t.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`
);

// Import User Model
const userModel = require("./models/Users");

app.get("/users", async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

app.post("/createUser", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Sever Work!");
});

// Import Admin Model
const AdminModel = require("./models/Admins");
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const admin = await AdminModel.findOne({ username });

  if (admin) {
    return res.json({ message: "the user is exists" });
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const newAdmin = new AdminModel({
    username,
    password: hashPassword,
  });

  await newAdmin.save();

  return res.json({ admin: newAdmin, message: "admin created successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await AdminModel.findOne({ username });

  if (!admin) {
    return res.json({ message: "the user doesn't exists!" });
  }

  const isCorrectPassword = await bcrypt.compare(password, admin.password);

  if (!isCorrectPassword) {
    return res.json({ message: "Username or Password is not correct" });
  }

  const token = jwt.sign({id: admin._id}, process.env.SECRET)

  return res.json({ message: "Login Successfully" , token, adminId : admin._id});
});
