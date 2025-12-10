import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../API"; // axios instance
import { useAuth } from "./AuthContext"; 


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart from backend when user logs in
  useEffect(() => {
    if (!user) {
      setCart([]); // clear cart on logout
      return;
    }
    const fetchCart = async () => {
      try {
        const res = await api.get("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.items || []);
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };
    fetchCart();
  }, [user, token]);

  // Add item to cart
  const addToCart = async (item) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await api.post("/api/cart/add",{ product_id: item.product_id||item.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // After adding, fetch updated cart
      const res = await api.get("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart(res.data.items || []);
    console.log("Item added to cart");
  } catch (err) {
    console.error(
      "Add to cart failed:",
      err.response?.status,
      err.response?.data?.message || err.message
    );
  }
};

//removeonefromcart

const removeFromCart = async (product_id) => {
  if(!user) 
    return;
  console.log("removeFromCart called with product_id:", product_id);
  try {
    const response = await api.delete(`/api/cart/remove/${ product_id }`,
     { headers: { Authorization: `Bearer ${token}` }}
    );
    setCart(response.data.items || [] );
  } catch (error) {
    console.error("Failed to remove item:", error);
  }
};

  // Update item quantity
  const updateQuantity = async (product_id, newQty) => {
    try {
      const res = await api.put( "/api/cart/update", { product_id, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items);
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };

  // Remove an item completely
  const removeItemCompletely = async (product_id) => {
    try {
      const res = await api.delete(`/api/cart/remove/${product_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Remove item failed", err);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await api.delete("/api/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
    } catch (err) {
      console.error("Clear cart failed", err);
    }
  };

  const totalItems = (cart ||[]).reduce((sum, i) => sum + (i.quantity || 0), 0);
  const totalPrice = (cart ||[]).reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        removeItemCompletely,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

