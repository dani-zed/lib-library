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
  <div
    style={{
      background: "rgb(13, 13, 13)",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Georgia', serif",
      color: "#e6e2d9",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        background: "#2a2a2a",
        padding: "30px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "600px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
      }}
    >
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>➕ Add New Book</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #4a4a4a",
            background: "#3a3a3a",
            color: "#e6e2d9",
          }}
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #4a4a4a",
            background: "#3a3a3a",
            color: "#e6e2d9",
          }}
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #4a4a4a",
            background: "#3a3a3a",
            color: "#e6e2d9",
          }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #4a4a4a",
            background: "#3a3a3a",
            color: "#e6e2d9",
          }}
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #4a4a4a",
            background: "#3a3a3a",
            color: "#e6e2d9",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "12px",
            borderRadius: "8px",
            background: "#444",
            border: "1px solid #666",
            color: "#e6e2d9",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ✔ Add Book
        </button>
      </form>
    </div>
  </div>
);
};

export default AddBook;