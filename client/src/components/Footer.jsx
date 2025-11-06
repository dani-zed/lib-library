// src/components/Footer.jsx
const Footer = () => (
  <footer
    style={{
      background: "#f1f1f1",
      textAlign: "center",
      padding: "12px",
      marginTop: "20px",
    }}
  >
    <p>© {new Date().getFullYear()} My Library App</p>
  </footer>
);

export default Footer;