const SuccessModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div style={overlay}>
      <div style={card}>
        <h3 style={{ color: "#6fe36f", marginBottom: "10px" }}>✓ Success</h3>
        <p style={{ opacity: 0.9 }}>{message}</p>

        <button style={closeBtn} onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

/* Styles reused */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const card = {
  background: "#1a1a1a",
  padding: "30px",
  borderRadius: "12px",
  width: "320px",
  color: "#e6e2d9",
  fontFamily: "Georgia, serif",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(255,255,255,0.08)",
};

const closeBtn = {
  marginTop: "15px",
  padding: "10px",
  background: "#333",
  border: "1px solid #555",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
};

export default SuccessModal;