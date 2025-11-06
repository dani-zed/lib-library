import pool from "../config/db.js";

// Get all books
export const getBooks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new book
export const addBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const [result] = await pool.query(
      "INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
      [title, author, year]
    );

    res.json({ id: result.insertId, title, author, year });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM books WHERE id = ?", [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};