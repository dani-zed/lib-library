import React from "react";

const ProfilePage = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (
    <div
      style={{
        background: "rgb(13, 13, 13)", // Kindle dark mode background
        minHeight: "100vh",
        padding: "40px 20px",
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

          <h1 style={{ marginTop: "15px", fontSize: "28px", fontWeight: "bold" }}>
            {username}'s Library
          </h1>

          <p style={{ fontSize: "18px", opacity: 0.8 }}>
            Role: <b>{role}</b>
          </p>
        </div>

        {/* Role-based UI */}
        {role === "author" ? (
          <>
            <h2 style={{ marginBottom: "10px", fontSize: "22px" }}>Your Published Books</h2>
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
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: "10px", fontSize: "22px" }}>Your Reading Library</h2>
            <p style={{ opacity: 0.75 }}>
              View and continue reading your saved books.
            </p>

            <div style={{ marginTop: "20px" }}>
              <a
                href="/my-library"
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
                📖 View My Library
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;