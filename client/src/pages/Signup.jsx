import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "",role:"" });
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/auth/signup", form);
    alert("User registered successfully!");
    navigate("/login");
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
        📝 Sign Up
      </h2>

      {/* Username */}
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
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

      {/* Password */}
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
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
<select
  onChange={(e) => setForm({ ...form, role: e.target.value })}
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
    outline: "none",
  }}
>
  <option value="">Select Role</option>
  <option value="reader">Reader</option>
  <option value="author">Author</option>
</select>
      {/* Register Button */}
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
        onClick={handleSubmit}
      >
        Register →
      </button>
    </div>
  </div>
);
};

export default Signup;