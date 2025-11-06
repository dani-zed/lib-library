import express from "express";
import { getBooks, addBook, deleteBook, getBookById } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", addBook);
router.delete("/:id", deleteBook);

export default router;