import pool from "./config/db.js";

(async () => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS `current_time`");
    console.log("✅ Connected! Current time:", rows[0].current_time);
  } catch (err) {
    console.error("❌ Database connection failed:");
    console.error(err);
  }
})();