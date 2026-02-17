import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookDetails } from "../controllers/bookController";
import { addToFavorites,getFavorites,deleteFromFavorites } from "../api/booksApi";
import MessageModal from "../model/MessageModal";
import { IoHeartOutline,IoHeartSharp  } from "react-icons/io5";

const BookPage = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams(); // get book id from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState(null);
  const [hasProgress, setHasProgress] = useState(false);
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
  useEffect(() => {
    const savedScroll = localStorage.getItem(`book-progress-${book?.id}`);
    if (savedScroll && parseInt(savedScroll, 10) > 50) {
    setHasProgress(true);
  }
    }, [book?.id]);
 // Check if this book is in user's favorites
  useEffect(() => {
    if (!isLoggedIn || !book?.id) return;
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
  }, [book?.id, isLoggedIn]); // ✅ run when book or login status changes
  // Toggle favorite status
const toggleFavorite = async () => {
  if (!isLoggedIn) {
    setToast({ message: "Please log in to manage favorites!", type: "error" });
    return;
  }
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
    setToast({ message: "Error updating favourites! try logging in again", type: "error" });
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
      {!isFavorite ? <IoHeartOutline size={28} /> : <IoHeartSharp size={28} color="#ff4d4d" />}
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

      {/* <h3 style={{ marginTop: "30px", fontSize: "24px" }}>Content Preview</h3> */}
{!isLoggedIn ? (
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
        <p style={{ opacity: 0.9 }}>
          Please log in to read the content of this book. 📖
        </p>
      </div>
    ) : (
       <div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    onClick={() => navigate(`/read/${book.id}`)}
    style={{
      background: "#2b2b2b",          // dark parchment/card
      border: "1px solid #444",
      borderRadius: "12px",
      padding: "18px 40px",
      color: "#f5f5dc",               // warm parchment text
      fontSize: "20px",
      fontFamily: "Georgia, serif",
      cursor: "pointer",
      boxShadow: "0 0 15px rgba(255, 200, 100, 0.2)", // soft warm glow
      transition: "all 0.3s ease",
      textAlign: "center",
      maxWidth: "250px",
      width: "100%",
      userSelect: "none",
      transform: "translateY(0px)",
      animation: "float 3s ease-in-out infinite",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#3a3a3a";
      e.currentTarget.style.boxShadow = "0 0 25px rgba(255, 200, 100, 0.4)";
      e.currentTarget.style.transform = "translateY(-3px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#2b2b2b";
      e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 200, 100, 0.2)";
      e.currentTarget.style.transform = "translateY(0px)";
    }}
  >
    {hasProgress ? "Continue Reading 📖" : "Start Reading 📖"}
  </div>

  {/* Floating parchment animation */}
  <style>
    {`
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
        100% { transform: translateY(0px); }
      }
    `}
  </style>
</div>
    )}
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