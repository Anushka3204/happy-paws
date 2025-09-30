import React, { useEffect, useState } from "react";
import "./NavBar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // for hamburger toggle

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/pet-logo.png" alt="Website Logo" className="logo" />
        <h1>Happy Paws</h1>
      </div>

      {/* Hamburger icon */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>

      {/* Links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li><a href="/">Home</a></li>
        {!isLoggedIn && (
          <>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/login">Login</a></li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
