import express from "express";
import { getBooks, addBook, deleteBook, getBookById, getBookByAuthor, updateBook, verifyPassword, addFavorite, deleteFavorite, getUserFavorites } from "../controllers/bookController.js";
import { verifyToken,isAuthor } from "../auth/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/add-favorite",verifyToken,addFavorite);
router.get("/favorites",verifyToken,getUserFavorites);
router.delete("/favorites/:bookId",verifyToken,deleteFavorite);
router.get("/:id", getBookById);
router.get("/author/:id", getBookByAuthor);
router.post("/", verifyToken,isAuthor,addBook);
router.put("/:id", verifyToken,isAuthor,updateBook);
router.post("/verify-password", verifyToken, verifyPassword);
router.delete("/:id", verifyToken,isAuthor,deleteBook);
export default router;