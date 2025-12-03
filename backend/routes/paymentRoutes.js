import express from "express";
import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const client = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

// Create PayPal order
router.post("/create-order", async (req, res) => {
  const { total } = req.body;
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{ amount: { currency_code: "USD", value: total.toString() } }]
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Capture PayPal order
router.post("/capture-order", async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  try {
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
