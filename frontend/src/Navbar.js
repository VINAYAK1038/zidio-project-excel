

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: "15px 30px",
    color: "white",
    boxShadow: "0 4px 6px rgba(203, 110, 17, 0.1)",
  };

  const brandStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#facc15",
    textDecoration: "none",
  };

  const linksStyle = {
    display: "flex",
    gap: "20px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  };

  return (
    <nav style={navbarStyle}>
      <Link to="/" style={brandStyle}> 📊 Excel Analytics</Link>
      <div style={linksStyle}>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/signup" style={linkStyle}>Signup</Link>
        <Link to="/dashboard" style={linkStyle}></Link>
      
      </div>
    </nav>
    
  );
};

export default Navbar;
