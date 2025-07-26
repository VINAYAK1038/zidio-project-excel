import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Analyze from "./Analyze";

function App1() {
  return (
     <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze/:fileName" element={<Analyze />} />

                <Route path="/" element={<Login />} />
                  

      </Routes>
    </Router>
    <Footer />
   </>
  );
}

export default App1;
