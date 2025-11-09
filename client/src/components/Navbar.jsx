
import { Link,  useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // set during login

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
      <nav style={{ background: "#333", color: "#fff", padding: "10px" }}>
        <Link to="/" style={{ color: "#fff", marginRight: "20px" }}>
          Library
        </Link>

        {role === "admin" && (
          <Link to="/add" style={{ color: "#fff", marginRight: "20px" }}>
            Add Book
          </Link>
        )}

        {!token ? (
          <>
            <Link to="/login" style={{ color: "#fff", marginRight: "20px" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "#fff" }}>
              Signup
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
            Logout
          </button>
        )}
      </nav>
  );
};

export default Navbar;