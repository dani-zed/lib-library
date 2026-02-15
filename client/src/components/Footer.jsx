const Footer = () => (
  <footer
    style={{
      background: "#1a1a1a",        // dark footer
      textAlign: "center",
      padding: "12px 20px",
      color: "#e6e2d9",             // warm off-white
      marginTop: "20px",
      fontFamily: "Georgia, serif",
      borderTop: "1px solid #2a2a2a",
      position: "relative",          // normal flow, not fixed
      bottom: 0,
      width: "100%",
    }}
  >
    <p style={{ margin: 0 }}>© {new Date().getFullYear()} My Library App</p>
  </footer>
);

export default Footer;