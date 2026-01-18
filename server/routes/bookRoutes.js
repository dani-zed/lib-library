import express from "express";
import { getBooks, addBook, deleteBook, getBookById } from "../controllers/bookController.js";
import { verifyToken,isAuthor } from "../auth/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken,isAuthor,addBook);
router.delete("/:id", verifyToken,isAuthor,deleteBook);

export default router;