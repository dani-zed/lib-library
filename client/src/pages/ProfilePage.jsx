import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { deleteBookController } from "../controllers/bookController";
import DeleteConfirmationModal from "../model/DeleteConfirmatioinModal";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const navigate = useNavigate();
  const getBooksByAuthorUrl = "http://localhost:5001/api/books/author/";
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [books, setBooks] = useState([]);
  const fetchBooksByAuthor = async () => {
    try {
      const res = await axios.get(`${getBooksByAuthorUrl}${userId}`);
      console.log("booksbyauthor", res.data);

      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching author books:", err);
    }
  };

  useEffect(() => {
    if (role === "author") {
      fetchBooksByAuthor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);
  const handleDeleteClick = (bookId) => {
    setSelectedBookId(bookId);
    setShowPasswordModal(true);
  };
  const confirmDelete = async () => {
    try {
      await deleteBookController(selectedBookId);
      alert("Book deleted!");
      setShowPasswordModal(false);
      await fetchBooksByAuthor(); // refresh list
    } catch (err) {
      alert("Failed to delete book.");
      console.error(err);
    }
  };
  return (
    <div
      style={{
        background: "rgb(13, 13, 13)", // Kindle dark mode background
        minHeight: "100vh",
        padding: "40px 20px",
        paddingTop:"120px",
        fontFamily: "'Georgia', serif",
        color: "#e6e2d9", // warm off-white
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#2a2a2a", // dark grey Kindle card
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
        }}
      >
        {/* Profile Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#3b3b3b",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "50px",
              color: "#e6e2d9",
            }}
          >
            📚
          </div>

          <h1
            style={{ marginTop: "15px", fontSize: "28px", fontWeight: "bold" }}
          >
            {username}'s Library
          </h1>

          <p style={{ fontSize: "18px", opacity: 0.8 }}>
            <b>{role === "user" ? "Reader" : "Publisher"}</b>
          </p>
        </div>

        {/* Role-based UI */}
        {role === "author" ? (
          <>
            <h2 style={{ marginBottom: "10px", fontSize: "22px" }}>
              Your Published Books
            </h2>
            <p style={{ opacity: 0.8 }}>
              Manage and edit the books you’ve published.
            </p>

            <div style={{ marginTop: "20px" }}>
              <a
                href="/add"
                style={{
                  display: "inline-block",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  background: "#3a3a3a",
                  border: "1px solid #4a4a4a",
                  textDecoration: "none",
                  color: "#e6e2d9",
                  fontWeight: "bold",
                }}
              >
                ➕ Add New Book
              </a>
            </div>
            <div style={{ marginTop: "30px" }}>
              {books.length === 0 ? (
                <p style={{ opacity: 0.7 }}>No books published yet.</p>
              ) : (
                books.map((book) => (
                  <div
                    key={book.id}
                    style={{
                      padding: "15px",
                      marginBottom: "15px",
                      background: "#3a3a3a",
                      borderRadius: "8px",
                    }}
                  >
                    <h3>{book.title}</h3>
                    <p style={{ opacity: 0.7 }}>{book.description}</p>

                    <div style={{ marginTop: "10px" }}>
                      <a
                        href={`/edit/${book.id}`}
                        style={{
                          marginRight: "10px",
                          color: "#9cccff",
                          textDecoration: "underline",
                        }}
                      >
                        ✏ Edit
                      </a>

                      <button
                        onClick={() => {
                          handleDeleteClick(book.id);
                        }}
                        style={{
                          color: "salmon",
                          textDecoration: "underline",
                        }}
                      >
                        🗑 Delete
                      </button>
                    </div>
                    <DeleteConfirmationModal
                      show={showPasswordModal}
                      onCancel={() => setShowPasswordModal(false)}
                      onConfirm={confirmDelete}
                    />
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "22px" }}>Your Favourites</h2>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => navigate("/my-library")}
                style={{
                  display: "inline-block",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  background: "#3a3a3a",
                  border: "1px solid #4a4a4a",
                  textDecoration: "none",
                  color: "#e6e2d9",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                📖 View My Library
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
