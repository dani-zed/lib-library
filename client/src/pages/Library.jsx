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
        console.log(data);
        
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books in Library component:", error);
      }
    };
    fetchBooks();
  }, []);
  return (
   <div className="container">
      <h1>📚 ZeD Kindle</h1>
      <div style={{ display: "grid", gap: "20px" }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Library;