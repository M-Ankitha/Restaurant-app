import React from "react";
import api from "../API";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleApprove = async (orderID) => {
    try {
      await api.post("/paypal/capture-order", { orderID });
      alert("Payment successful!");
      clearCart();
      navigate("/");
    } catch(err){
      alert("Payment failed");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ${total}</p>
      <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, currency:"USD"}}>

        <PayPalButtons
          createOrder={async ()=>{
            const res = await api.post("/paypal/create-order", { total });
            return res.data.id;
          }}
          onApprove={async (data)=>handleApprove(data.orderID)}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Checkout;
