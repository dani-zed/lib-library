import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBookController } from "../controllers/bookController";
import useAuth from "../hooks/useAuth";

const AddBook = () => {
    // useAuth(["admin"]); // Only admins can access
    useAuth(["author"]); // Only authors can access
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBookController(formData);
      alert("Book added successfully!");
      navigate("/"); // Go back to library page
    } catch (error) {
      alert("Failed to add book.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
        />
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;