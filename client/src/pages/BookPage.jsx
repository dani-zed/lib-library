import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookDetails } from "../controllers/bookController";

const BookPage = () => {
  const { id } = useParams(); // get book id from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookDetails(id);
        console.log(data,"bookpage");
        
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]); // ✅ run once when id changes

  if (loading) return <div>Loading book details...</div>;
  if (!book) return <div>Book not found!</div>;

 return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0d0d0d",
      padding: "30px",
    }}
  >
    <div
      style={{
        background: "#1a1a1a",
        padding: "30px",
        borderRadius: "12px",
        width: "min(700px, 95%)",
        boxShadow: "0 0 20px rgba(255,255,255,0.08)",
        color: "white",
        fontFamily: "Georgia, serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ marginBottom: "10px", fontSize: "32px" }}>{book.title}</h1>

      <p style={{ margin: "5px 0", fontSize: "18px" }}>
        <strong>Author:</strong> {book.author}
      </p>
      <p style={{ margin: "5px 0", fontSize: "18px" }}>
        <strong>Year:</strong> {book.year}
      </p>

      <p style={{ marginTop: "20px", opacity: 0.85 }}>
        {book.description || "No description available."}
      </p>

      <h3 style={{ marginTop: "30px", fontSize: "24px" }}>Content Preview</h3>

      <div
        style={{
          marginTop: "10px",
          background: "#111",
          padding: "20px",
          borderRadius: "8px",
          whiteSpace: "pre-line",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <p style={{ opacity: 0.9 }}>{book.content}</p>
      </div>
    </div>
  </div>
);
};

export default BookPage;