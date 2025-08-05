// Signup.js
import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // ✅ Uses fetch instead of axios
  const signupUser = async (userData) => {
    try {
      const response = await fetch("https://zidio-backend.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        console.log(result);
        setFormData({ name: "", email: "", password: "" }); // Clear form
      } else {
        alert("Signup failed: " + (result.message || "Unknown error"));
        console.error(result);
      }
    } catch (error) {
      alert("Signup error occurred");
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupUser(formData);
  };

  // 💅 Inline styles (same as before)
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
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          style={inputStyle}
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
