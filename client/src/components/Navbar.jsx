import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingModal from "../model/LoadingModal";
import { useMusic } from "../context/MusicContext";

const Navbar = () => {
  const { toggleMusic, isPlaying } = useMusic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


const handleLogout = () => {
  setLoading(true);
  setTimeout(() => {
    localStorage.clear();
    navigate("/login");
    setLoading(false);
  }, 800); // smooth fade
};
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "#0d0d0d",
        borderBottom: "1px solid #2a2a2a",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Link
          to="/"
          style={{
            color: "#eaeaea",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          ZeD Kindle
        </Link>
    <button
        onClick={toggleMusic}
        style={{
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: "white"
        }}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
        {role === "author" && token && (
          <Link
            to="/add"
            style={{
              color: "#ccc",
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            + Add Book
          </Link>
        )}
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {!token ? (
          <>
            <Link to="/login" style={{ color: "#ccc", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "#ccc", textDecoration: "none" }}>
              Signup
            </Link>
          </>
        ) : (
          <>
            {/* Profile Icon */}
            <div
              onClick={() =>
                navigate(role === "author" ? "/profile" : "/profile")
              }
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#1a1a1a",
                border: "1px solid #444",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
              title="Profile"
            >
              👤
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                background: "#1a1a1a",
                border: "1px solid #444",
                padding: "8px 15px",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                transition: "0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#222")}
              onMouseLeave={(e) => (e.target.style.background = "#1a1a1a")}
            >
              Logout
            </button>
          </>
        )}
      </div>
      <LoadingModal show={loading} text="Logging out..." />
    </nav>
  );
};

export default Navbar;