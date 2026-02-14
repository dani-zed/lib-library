import { useEffect, useState } from "react";
import { getFavorites } from "../api/booksApi";
import { useNavigate } from "react-router-dom";

const MyLibrary = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error("Error loading favourites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <div style={{ color: "white", padding: "30px" }}>Loading...</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "#e6e2d9",
        padding: "40px 20px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "25px", fontSize: "32px", textAlign: "center" }}>
          ❤️ Your Favourites
        </h1>

        {favorites.length === 0 ? (
          <p style={{ opacity: 0.7, textAlign: "center" }}>You haven’t added any favorites yet.</p>
        ) : (
          favorites.map((book) => (
            <div
              key={book.id}
              style={{
                background: "#1a1a1a",
                padding: "18px",
                borderRadius: "10px",
                marginBottom: "15px",
                cursor: "pointer",
                transition: "0.2s",
                boxShadow: "0 0 10px rgba(255,255,255,0.06)",
              }}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <h3 style={{ margin: 0, fontSize: "22px" }}>{book.title}</h3>
              <p style={{ margin: "5px 0", opacity: 0.8 }}>{book.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyLibrary;