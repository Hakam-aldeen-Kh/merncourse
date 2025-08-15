import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post(`${api}/register`, { username, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>📝 Register</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", textAlign: "center" },
  input: { width: "100%", padding: "10px", margin: "10px 0" },
  button: { width: "100%", padding: "10px", background: "#2ecc71", color: "#fff", border: "none", borderRadius: "5px" }
};
