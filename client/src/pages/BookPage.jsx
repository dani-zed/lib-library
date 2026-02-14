import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookDetails } from "../controllers/bookController";
import { addToFavorites,getFavorites,deleteFromFavorites } from "../api/booksApi";
import MessageModal from "../model/MessageModal";

const BookPage = () => {
  const { id } = useParams(); // get book id from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookDetails(id);
        
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]); // ✅ run once when id changes

  // Check if this book is in user's favorites
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favs = await getFavorites();
        const exists = favs.some((b) => b.id === book.id);
        setIsFavorite(exists);
      } catch (err) {
        console.error("Error loading favs:", err);
      }
    };
    loadFavorites();
  }, [book?.id]);
  // Toggle favorite status
const toggleFavorite = async () => {
  try {
    if (isFavorite) {
      await deleteFromFavorites(book.id);
      setIsFavorite(false);
      setToast({ message: "Removed from favourites", type: "error" });
    } else {
      await addToFavorites(book.id);
      setIsFavorite(true);
      setToast({ message: "Added to favourites ❤️", type: "success" });
    }
  } catch (err) {
    setToast({ message: "Error updating favourites!", type: "error" });
  }
};
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
      {/* add to favorites button here in future */}
  <button
      onClick={toggleFavorite}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "28px",
        marginBottom: "10px",
        color: isFavorite ? "#ff4d4d" : "#888", // filled red OR grey outline
        transition: "0.2s",
      }}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>

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
    {toast && (
  <MessageModal
    message={toast.message}
    type={toast.type}
    onClose={() => setToast(null)}
  />
)}
  </div>
);
};

export default BookPage;