import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { getBookDetails, updateBookController } from "../controllers/bookController";

const EditBook = () => {
    const { id } = useParams();
const navigate = useNavigate();
    const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    description: "",
    content: ""
  });
  useEffect(() => {
    const fetchBookDetails = async () => {
        try{
            const data = await getBookDetails(id);
            setFormData({
                title: data.title,
                author: data.author,
                year: data.year,
                description: data.description,
                content: data.content
            });
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };
    fetchBookDetails();
  }, [id]);
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBookController(id, formData);
      alert("Book updated successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to update book.");
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
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>✏️ Edit Book</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #4a4a4a",
            background: "#3a3a3a",
            color: "#e6e2d9",
          }}
        />

        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #4a4a4a",
            background: "#3a3a3a",
            color: "#e6e2d9",
          }}
        />

        <input
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
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
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
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
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
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
          ✔ Update Book
        </button>
      </form>
    </div>
  </div>
);
};

export default EditBook;