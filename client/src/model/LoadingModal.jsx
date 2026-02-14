const LoadingModal = ({ show, text = "Loading..." }) => {
  if (!show) return null;

  return (
    <div style={overlay}>
      <div style={card}>
        <div style={spinner} />
        <p style={textStyle}>{text}</p>
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
  padding: "30px 40px",
  borderRadius: "12px",
  color: "#e6e2d9",
  fontFamily: "Georgia, serif",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(255,255,255,0.08)",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #444",
  borderTop: "4px solid #e6e2d9",
  borderRadius: "50%",
  margin: "0 auto 15px auto",
  animation: "spin 1s linear infinite",
};

const textStyle = { margin: 0, fontSize: "18px" };

export default LoadingModal;