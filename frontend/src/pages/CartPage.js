
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart=[], addToCart, removeFromCart, removeItemCompletely, clearCart, totalPrice } = useCart();

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ?(
       <p>Cart is empty</p>) : (
        <>
          {cart.map((it) => (
            <div key={it.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <strong>{it.name}</strong> - ${it.price} × {it.quantity} = ${(it.price * it.quantity).toFixed(2)}
              </div>
              <div>
                <button onClick={() => removeFromCart(it.product_id)}>-</button>
                <button onClick={() => addToCart(it)}>+</button>
                <button onClick={() => removeItemCompletely(it.product_id)} style={{ marginLeft: 8 }}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={clearCart}>Clear Cart</button>
            <Link to="/checkout"><button>Checkout</button></Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

