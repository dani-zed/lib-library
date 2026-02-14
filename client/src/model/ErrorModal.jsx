const ErrorModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div style={overlay}>
      <div style={card}>
        <h3 style={{ color: "#ff4d4d", marginBottom: "10px" }}>⚠ Error</h3>
        <p style={{ opacity: 0.9 }}>{message}</p>

        <button style={closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
/* Styles */
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
  width: "340px",
  color: "#e6e2d9",
  fontFamily: "Georgia, serif",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(255,255,255,0.08)",
};

const closeBtn = {
  padding: "10px 15px",
  background: "#8b0000",
  border: "1px solid #aa0000",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
};
/* Same styles */
export default ErrorModal;