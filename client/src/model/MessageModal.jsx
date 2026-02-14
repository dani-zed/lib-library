import React, { useEffect } from "react";

const MessageModal = ({ message, type = "info", onClose }) => {
  // Auto-close after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={overlay}>
      <div style={{
        ...card,
        borderLeft: type === "error" ? "4px solid #ff4d4d" : "4px solid #4caf50"
      }}>
        <p style={{ margin: 0 }}>{message}</p>
      </div>
    </div>
  );
};

/* Styles */
const overlay = {
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 9999,
};

const card = {
  background: "#1a1a1a",
  color: "#e6e2d9",
  padding: "14px 18px",
  borderRadius: "8px",
  fontFamily: "Georgia, serif",
  boxShadow: "0 0 12px rgba(255,255,255,0.08)",
  maxWidth: "280px",
};

export default MessageModal;