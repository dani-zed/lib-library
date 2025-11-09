import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/auth/signup", form);
    alert("User registered successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Signup;