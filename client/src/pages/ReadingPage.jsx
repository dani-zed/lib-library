import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getBookDetails } from "../controllers/bookController";
import { useMusic } from "../context/MusicContext";
import MessageModal from "../model/MessageModal";

const ReadingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem("token");
  const { isPlaying, toggleMusic } = useMusic();
  const [toast, setToast] = useState(null);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const scrollKey = `book-progress-${id}`; // unique key per book

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookDetails(id);
        setBook(data);
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to load book", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Restore scroll position
  useEffect(() => {
    if (contentRef.current) {
      const saved = localStorage.getItem(scrollKey);
      if (saved) contentRef.current.scrollTop = parseInt(saved, 10);
    }
  }, [book, scrollKey]);

  // Track scroll & update progress
  const handleScroll = () => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const perc = (scrollTop / scrollHeight) * 100;
    setProgress(perc);
    localStorage.setItem(scrollKey, scrollTop);
  };

  if (loading) return null;
  if (!book)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0d0d0d",
          color: "#e6e2d9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        Book not found.
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#e6e2d9",
        fontFamily: "Georgia, serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        position: "relative",
        overflow: "auto",
      }}
    >
       {/* Floating Music & Home Icons */}
<div
  style={{
    position: "fixed",
    top: "90px",
    right: "20px",
    display: "flex",
    gap: "12px",
    zIndex: 1000,
  }}
>
  {/* Music Toggle */}
  <button
    onClick={toggleMusic}
    style={{
      background: "#1a1a1a",
      border: "1px solid #444",
      padding: "10px 14px",
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: "20px",
      color: isPlaying ? "#ffcc66" : "#888",
      transition: "0.2s",
    }}
  >
    {isPlaying ? "🔊" : "🔇"}
  </button>

  {/* Home Button */}
  <button
    onClick={() => navigate("/")}
    style={{
      background: "#1a1a1a",
      border: "1px solid #444",
      padding: "10px 14px",
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: "20px",
      color: "#e6e2d9",
      transition: "0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
    title="Back to Home"
  >
    🏠
  </button>
</div>
      {/* Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${progress}%`,
          background: "#666565ff",
          zIndex: 999,
          transition: "width 0.1s linear",
        }}
      />

      {/* Book Content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: "40px",
          background: "#1a1a1a",
          borderRadius: "12px",
          boxShadow: "0 0 30px rgba(0,0,0,0.6)",
          lineHeight: "1.8",
          fontSize: "20px",
          whiteSpace: "pre-line",
          color: "#f5f5dc",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>{book.title}</h1>
        <p style={{ marginBottom: "40px", opacity: 0.8 }}>
          <strong>Author:</strong> {book.author} | <strong>Year:</strong>{" "}
          {book.year}
        </p>

        {!isLoggedIn ? (
          <p style={{ opacity: 0.7 }}>🔒 Please log in to read this book.</p>
        ) : (
          <p>{book.content}</p>
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

export default ReadingPage;
