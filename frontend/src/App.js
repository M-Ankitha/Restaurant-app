import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import About from "./pages/About";
import Reservations from "./pages/Reservations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import { setAuthToken } from "./API";
import { CartProvider } from "./context/CartContext";

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const loginUser = (userObj, jwt) => {
    setUser(userObj);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <CartProvider>
      <div>
        <Navbar user={user} logout={logout} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<Login onLogin={loginUser} />} />
            <Route path="/register" element={<Register onRegister={loginUser} />} />
            <Route path="/about" element={<About />} />
            <Route path="/Reservations" element={<Reservations />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;

