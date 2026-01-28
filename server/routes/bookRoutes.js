import express from "express";
import { getBooks, addBook, deleteBook, getBookById, getBookByAuthor } from "../controllers/bookController.js";
import { verifyToken,isAuthor } from "../auth/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.get("/author/:id", getBookByAuthor);
router.post("/", verifyToken,isAuthor,addBook);
router.delete("/:id", verifyToken,isAuthor,deleteBook);

export default router;