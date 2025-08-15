const { Schema, model } = require("mongoose");

const adminsSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminModel = new model("admins", adminsSchema);

module.exports = adminModel;
