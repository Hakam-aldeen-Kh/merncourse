import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {useCookies} from 'react-cookie'

export default function Login() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [_,setCookies] = useCookies(['accessToken'])

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    try {
      const res = await axios.post(`${api}/login`, { username, password });
      setCookies('accessToken',res.data.token)
      localStorage.setItem("adminId", res.data.adminId)
      navigate("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔑 Login</h2>
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
      <button style={styles.button} onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", textAlign: "center" },
  input: { width: "100%", padding: "10px", margin: "10px 0" },
  button: { width: "100%", padding: "10px", background: "#3498db", color: "#fff", border: "none", borderRadius: "5px" }
};
