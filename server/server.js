import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test DB connection
pool.getConnection()
  .then(() => console.log("✅ MySQL connected"))
  .catch((err) => console.error("❌ MySQL connection failed:", err));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.body);
  next();
});

app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("📚 Library API running with SQL");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));