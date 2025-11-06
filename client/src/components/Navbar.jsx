// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ background: "#007bff", padding: "12px" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "white" }}>📚 My Library</h2>
        <div>
          <Link to="/" style={{ color: "white", marginRight: "16px" }}>
            Home
          </Link>
          <Link to="/add" style={{ color: "white" }}>
            Add Book
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;