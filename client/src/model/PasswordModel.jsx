import { useState } from "react";
import { verifyBookPassword } from "../controllers/bookController";

const PasswordModal = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState("");

  const handleVerify = async () => {
    try {

      await verifyBookPassword(password);

      onSuccess(); // password OK → proceed
    } catch (err) {
      alert("Wrong password!");
      console.error(err);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.7)", display: "flex",
      alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#2a2a2a", padding: "20px",
        borderRadius: "10px", color: "#fff", width: "300px"
      }}>
        <h3>Confirm Password</h3>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginTop: 10, padding: 10 }}
        />
        <button
          style={{ marginTop: 15, width: "100%", padding: 10 }}
          onClick={handleVerify}
        >
          Confirm
        </button>
        <button
          style={{ marginTop: 10, width: "100%", padding: 10 }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;