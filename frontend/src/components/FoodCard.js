import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./FoodCard.css";

const FoodCard = ({ item }) => {
  const { name, price, image } = item;
  const { cart=[], addToCart, removeFromCart } = useCart();
  const [localQty, setLocalQty] = useState(0);

  // keep local shown quantity synced with context cart 
  
  useEffect(() => {
    if (!Array.isArray(cart)) return; 
    const found = cart.find((i) => i.name === name);
    setLocalQty(found ? found.quantity : 0);
  }, [cart, name]);

  const handleAdd = () => {
    addToCart({id: item.id, name, price, image });
    // localQty will update via useEffect reading context
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    // localQty will update via useEffect reading context
  };

  return (
    <div className="food-card">
      <img src={`http://localhost:5000${image}`}
       alt={name}
       className="food-image"/>
      {/*<img src={image} alt={name} className="food-image" />*/}
      <h3>{name}</h3>
      <p>${price}</p>

      <div className="food-actions">
        <button onClick={handleAdd}>+</button>
        <button onClick={handleRemove} disabled={localQty <= 0}>-</button>
      </div>

      {localQty > 0 && <div className="quantity-badge">{localQty}</div>}
    </div>
  );
};

export default FoodCard;
