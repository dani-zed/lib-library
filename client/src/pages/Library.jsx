import BookCard from "../components/bookCard";
import { useEffect, useState } from "react";
import { getBooksController } from "../controllers/bookController";
const Library = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    setBooks([]);
    const fetchBooks = async () => {
      try {
        const data = await getBooksController();
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
      <h1>📚 My Library</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Library;