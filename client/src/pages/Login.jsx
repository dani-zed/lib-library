// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5001/api/auth/login", {
        username,
        password,
      });
      console.log("data",data);
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert("Login failed. Check credentials.");
      console.error(err);
    }
  };

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0d0d0d",
      padding: "20px",
      fontFamily: "Georgia, serif",
      color: "white",
    }}
  >
    <div
      style={{
        background: "#1a1a1a",
        padding: "40px",
        borderRadius: "14px",
        width: "min(400px, 90%)",
        boxShadow: "0 0 20px rgba(255,255,255,0.06)",
        border: "1px solid #2a2a2a",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          marginBottom: "30px",
          color: "#f1f1f1",
        }}
      >
        🔐 Login
      </h2>

      {/* Username Input */}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #333",
          background: "#111",
          color: "#eaeaea",
          fontSize: "15px",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.border = "1px solid #555")}
        onBlur={(e) => (e.target.style.border = "1px solid #333")}
      />

      {/* Password Input */}
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #333",
          background: "#111",
          color: "#eaeaea",
          fontSize: "15px",
        }}
        onFocus={(e) => (e.target.style.border = "1px solid #555")}
        onBlur={(e) => (e.target.style.border = "1px solid #333")}
      />

      {/* Login Button */}
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          background: "#333",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#444")}
        onMouseLeave={(e) => (e.target.style.background = "#333")}
        onClick={handleLogin}
      >
        Login →
      </button>
    </div>
  </div>
);
};

export default Login;