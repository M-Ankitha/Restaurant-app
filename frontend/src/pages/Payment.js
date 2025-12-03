import React from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  // This is a mock payment page. Integrate Stripe/PayPal for real payments.
  return (
    <div>
      <h2>Payment</h2>
      <p>This is a mock payment page. In production integrate a payment gateway.</p>
      <Link to="/"><button>Back to Home</button></Link>
    </div>
  );
};

export default Payment;
