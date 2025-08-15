import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const api = "http://localhost:3001";

  const [users, setUsers] = useState([]);
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // protect route
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnClick = async () => {
    if (!name || !age || !email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        `${api}/createUser`,
        { name, age, email },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setName("");
      setAge("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>👥 User Management</h1>
        <p style={styles.subtitle}>Create and manage users in a clean UI</p>
      </header>

      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>➕ Create New User</h2>
        <div style={styles.form}>
          <input
            type="text"
            value={name}
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            value={age}
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleOnClick} style={styles.button}>
            🚀 Create User
          </button>
        </div>
      </section>

      <section style={styles.userList}>
        <h2 style={styles.sectionTitle}>📋 Users List</h2>
        {loading ? (
          <p style={styles.loading}>Loading users...</p>
        ) : users.length === 0 ? (
          <p style={styles.noUsers}>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} style={styles.userCard}>
              <h3 style={styles.userName}>{user.name}</h3>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${user.email}`} style={styles.emailLink}>
                  {user.email}
                </a>
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#f4f7fa",
    padding: "2rem",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    color: "#2c3e50",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#7f8c8d",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    marginBottom: "1rem",
    color: "#34495e",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
    maxWidth: "600px",
    margin: "0 auto 2rem auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s ease-in-out",
  },
  button: {
    padding: "0.9rem 1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  userList: {
    maxWidth: "700px",
    margin: "0 auto",
  },
  userCard: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
    marginBottom: "1.2rem",
    transition: "transform 0.3s",
  },
  userName: {
    margin: "0 0 0.5rem 0",
    color: "#2c3e50",
  },
  emailLink: {
    color: "#2980b9",
    textDecoration: "none",
  },
  loading: {
    textAlign: "center",
    color: "#888",
  },
  noUsers: {
    textAlign: "center",
    color: "#bdc3c7",
    fontStyle: "italic",
  },
};
