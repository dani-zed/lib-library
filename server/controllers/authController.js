import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js"; // your DB connection

const JWT_SECRET = process.env.JWT_SECRET; // use .env in production

// ✅ User Signup
export const signup = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role || "user"]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Error creating user" });
  }
};

// ✅ User Login
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await db.query("SELECT * FROM users WHERE username = ?", [username] );
    console.log("userr",user);
    
    if (user.length === 0) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user[0].role });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
};