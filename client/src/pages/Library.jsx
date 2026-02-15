import BookCard from "../components/bookCard";
import { useEffect, useState } from "react";
import { getAllBooks } from "../controllers/bookController";
const Library = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    setBooks([]);
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books in Library component:", error);
      }
    };
    fetchBooks();
  }, []);
  return (
  <div
    style={{
      minHeight: "100vh",
      padding: "40px 20px",
      background: "#0d0d0d",
      color: "white",
      fontFamily: "Georgia, serif",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "42px",
        letterSpacing: "2px",
      }}
    >
      📚 ZeD Kindle Library
    </h1>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: "25px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  </div>
);
};

export default Library;