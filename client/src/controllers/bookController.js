import { addNewBook, deleteBook, fetchAllBooks,getBookById, updateBook, verifyPassword } from "../api/booksApi";


export const getAllBooks = async () => {
  try {
    const books = await fetchAllBooks();
    return books;
  } catch (error) {
    console.error("Error in getBooksController:", error);
    throw error;
  }
};

export const getBookDetails = async (bookId) => {
  try {
    const book = await getBookById(bookId);
    return book;
  } catch (error) {
    console.error(`Error in getBookDetails for ID ${bookId}:`, error);
    throw error;
  }
};

export const addBookController = async (bookData) => {
  try {
    const book = await addNewBook(bookData);
    return book;
  } catch (error) {
    console.error("Error in addBookController:", error);
    throw error;
  }
};
export const updateBookController = async (bookId, updatedData) => {
  try {
    const book = await updateBook(bookId, updatedData);
    return book;
  } catch (error) {
    console.error("Error in updateBookController:", error);
    throw error;
  }
};
export const verifyBookPassword = async (password) => {
  try {
    const response = await verifyPassword(password);
    return response;
  } catch (error) {
    console.error("Error in verifyBookPassword:", error);
    throw error;
  }
};
export const deleteBookController = async (bookId) => {
  try {
    await deleteBook(bookId);
  } catch (error) {
    console.error("Error in deleteBookController:", error);
    throw error;
  }
};