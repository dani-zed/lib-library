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
    <div className="container">
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Description:</strong> {book.description || "No description available."}</p>
    </div>
  );
};

export default BookPage;