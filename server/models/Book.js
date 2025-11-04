import pool from "../config/db.js";

// Get all books
export const getAllBooks = async () => {
  const [rows] = await pool.query("SELECT * FROM books");
  return rows;
};

// Add a new book
export const insertBook = async (book) => {
  const { title, author, year } = book;
  const [result] = await pool.query(
    "INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
    [title, author, year]
  );
  return result.insertId;
};

// Delete a book
export const deleteBookById = async (id) => {
  const [result] = await pool.query("DELETE FROM books WHERE id = ?", [id]);
  return result;
};