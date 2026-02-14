import { useState } from "react";

const DeleteConfirmationModal = ({ show, onConfirm, onCancel }) => {
  const [password, setPassword] = useState("");

  if (!show) return null;

  return (
    <div style={overlay}>
      <div style={card}>
        <h3 style={{ color: "#ff4d4d" }}>Delete Book?</h3>
        <p style={{ opacity: 0.8 }}>Enter your password to confirm deletion</p>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <button style={cancelBtn} onClick={onCancel}>Cancel</button>
          <button style={deleteBtn} onClick={() => onConfirm(password)}>Delete</button>
        </div>
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

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  background: "#111",
  color: "#e6e2d9",
  border: "1px solid #444",
  borderRadius: "8px",
};

const cancelBtn = {
  padding: "10px 15px",
  background: "#333",
  border: "1px solid #555",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "10px 15px",
  background: "#8b0000",
  border: "1px solid #aa0000",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
};

export default DeleteConfirmationModal;