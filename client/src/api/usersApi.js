import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/books';
 
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile with ID ${userId}:`, error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user profile with ID ${userId}:`, error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};