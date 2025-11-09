import express from "express";
import { getBooks, addBook, deleteBook, getBookById } from "../controllers/bookController.js";
import { verifyToken,isAdmin } from "../auth/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken,isAdmin,addBook);
router.delete("/:id", verifyToken,isAdmin,deleteBook);

export default router;