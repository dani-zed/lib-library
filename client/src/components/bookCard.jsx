// src/components/BookCard.jsx
const BookCard = ({ book }) => (
  <div
    style={{
      background: "white",
      borderRadius: "10px",
      padding: "16px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      width: "220px",
    }}
  >
    <h3>{book.title}</h3>
    <p><strong>Author:</strong> {book.author}</p>
    <p><strong>Year:</strong> {book.year}</p>
  </div>
);

export default BookCard;