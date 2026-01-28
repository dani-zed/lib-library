import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/books';

export const fetchAllBooks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${bookId}:`, error);
    throw error;
  }
};

export const addNewBook = async (bookData) => {
  try {
    const userId = localStorage.getItem("userId");
    bookData.author_id = userId; // Attach author_id to bookData
    console.log("authorid",bookData.author_id);
    
    const token = localStorage.getItem("token");
    const response = await axios.post(API_BASE_URL, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding new book:', error);
    throw error;
  }
};

export const updateBook = async (bookId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_BASE_URL}/${bookId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${bookId}:`, error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_BASE_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${bookId}:`, error);
    throw error;
  }
};

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching books with query "${query}":`, error);
    throw error;
  }
};