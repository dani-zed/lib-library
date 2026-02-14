import pool from "../config/db.js";
import bcrypt from "bcryptjs";
// Get all books
export const getBooks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getBookByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
  

    const [rows] = await pool.query("SELECT * FROM books WHERE authorId = ?", [id]);
  
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
    const { title, author, year, description ,content, author_id} = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const [result] = await pool.query(
      "INSERT INTO books (title, author, year, description, content, authorId) VALUES (?, ?, ?, ?, ?, ?)",
      [title, author, year, description,content,author_id]
    );

    res.json({ id: result.insertId, title, author, year });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year, description ,content} = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    await pool.query(
      "UPDATE books SET title = ?, author = ?, year = ?, description = ?, content = ? WHERE id = ?",
      [title, author, year, description,content, id]
    );

    res.json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//verify password before deleting book
export const verifyPassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id; // Comes from JWT

  const [rows] = await pool.query("SELECT password FROM users WHERE id = ?", [userId]);
  if (!rows.length) return res.status(404).json({ message: "User not found" });

  const isValid = await bcrypt.compare(password, rows[0].password);

  if (!isValid) return res.status(401).json({ message: "Wrong password" });

  return res.json({ success: true });
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
export const addFavorite = async (req, res) => {
  console.log("userid",req.user.id);
  
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    await pool.query(
      "INSERT INTO favorites (userId, bookId) VALUES (?, ?)",
      [userId, bookId]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getUserFavorites = async (req, res) => {
  console.log("hiiii");
  
  const userId = req.user.id;
console.log(userId);

  try {
    const [rows] = await pool.query(
      `SELECT books.* 
       FROM books
       JOIN favorites ON favorites.bookId = books.id
       WHERE favorites.userId = ?`,
      [userId]
    );
console.log(rows);

    res.json(rows);  // returns array of books
  } catch (err) {
    console.log("err in mbackend fav ",err.message);
    
    res.status(500).json({ error: err.message });
  }
};
export const deleteFavorite = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;

  try {
    await pool.query(
      "DELETE FROM favorites WHERE userId = ? AND bookId = ?",
      [userId, bookId]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};