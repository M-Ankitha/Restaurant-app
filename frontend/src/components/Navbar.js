import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <link rel="stylesheet"
       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"/>
      <Link to="/" className="logo-link">
        <div className="logo">FoodZone</div>
      </Link>

      {/* Hamburger for mobile */}
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </div>

      {/* Center Links */}
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/reservations">Reservations</Link>
      </div>

      {/* Right section */}
      <div className="right-section" ref={menuRef}>
        {!user ? (
          <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/cart" className="cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count">{totalItems}</span>
            </Link>

            <div className="user-menu">
              <i
                className="fa-solid fa-user"
                onClick={() => setShowUserMenu((prev) => !prev)}
                style={{ cursor: "pointer" }}
              ></i>

              {showUserMenu && (
                <div className="dropdown">
                  <span className="username">{user.name}</span>
                  <button className="logout" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

