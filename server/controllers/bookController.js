import { getAllBooks, insertBook, deleteBookById } from "../models/Book.js";

// GET /api/books
export const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/books
export const addBook = async (req, res) => {
  try {
    const id = await insertBook(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/books/:id
export const deleteBook = async (req, res) => {
  try {
    await deleteBookById(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};