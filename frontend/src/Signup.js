



import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://zidio-project-excel-backend.onrender.com/api/signup", formData);
      alert("Signup successful");
      setFormData({ name: "", email: "", password: "" }); // Clear form
    } catch (err) {
      alert("Signup failed");
    }
  };

  const containerStyle = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "300px",
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0f172a",
    fontSize: "24px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={titleStyle}>Signup</div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          style={inputStyle}
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          style={inputStyle}
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
