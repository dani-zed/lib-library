import { fetchAllBooks } from "../api/booksApi";


export const getBooksController = async () => {
  try {
    const books = await fetchAllBooks();
    return books;
  } catch (error) {
    console.error("Error in getBooksController:", error);
    throw error;
  }
};