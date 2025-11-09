import { addNewBook, fetchAllBooks,getBookById } from "../api/booksApi";


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