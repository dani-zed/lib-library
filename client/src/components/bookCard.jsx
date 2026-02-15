
import { useNavigate } from "react-router-dom";
const BookCard = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: "#1a1a1a",
        borderRadius: "12px",
        padding: "20px",
        color: "#eaeaea",
        boxShadow: "0 0 12px rgba(0,0,0,0.4)",
        transition: "transform 0.15s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        border: "1px solid #2a2a2a",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 0 18px rgba(255,255,255,0.08)";
      }}
        onClick={() => navigate(`/book/${book.id}`)}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 0 12px rgba(0,0,0,0.4)";
      }}
    >
      {/* Book Title */}
      <h2
        style={{
          fontSize: "20px",
          marginBottom: "8px",
          color: "#f1f1f1",
          fontWeight: "600",
        }}
      >
        {book.title}
      </h2>

      {/* Author */}
      <p style={{ margin: "0", opacity: 0.8, fontSize: "15px" }}>
        {book.author}
      </p>

      {/* Year */}
      <p style={{ margin: "6px 0 0 0", opacity: 0.7, fontSize: "14px" }}>
        {book.year}
      </p>

      {/* Description Preview */}
      <p
        style={{
          marginTop: "15px",
          fontSize: "14px",
          opacity: 0.75,
          height: "45px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {book.description || "No description available."}
      </p>

      {/* Button */}
      <button
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: "#333",
          color: "#eee",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#444")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#333")}
        onClick={() => navigate(`/book/${book.id}`)}
      >
        Open Book →
      </button>
    </div>
  );
};

export default BookCard;