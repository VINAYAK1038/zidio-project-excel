import React from "react";

function Footer() {
  const footerStyle = {
    backgroundColor: "#0f172a", 
    color: "#ffffff",
    textAlign: "center",
    padding: "12px",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    zIndex: 1000,
  };

  return (
    <footer style={footerStyle}>
      © 2025 Excel Analytics. All rights reserved.
    </footer>
  );
}

export default Footer;
