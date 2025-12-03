// routes/orderRoutes.js
import express from "express";
import { pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// place order (guest or logged-in)
router.post("/", async (req, res) => {
  try {
    const { userId=null, name, email, items, total, paid=false } = req.body;
    const [r] = await pool.query("INSERT INTO orders (user_id, name, email, total, paid) VALUES (?, ?, ?, ?, ?)", [userId, name, email, total, paid]);
    const orderId = r.insertId;

    const insertItems = items.map(i => [orderId, i.product_id || null, i.name, i.price, i.quantity]);
    if (insertItems.length) {
      await pool.query("INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES ?", [insertItems]);
    }

    // if logged in, clear user's cart
    if (userId) {
      const [[cartRow]] = await pool.query("SELECT id FROM carts WHERE user_id = ?", [userId]);
      if (cartRow) await pool.query("DELETE FROM cart_items WHERE cart_id = ?", [cartRow.id]);
    }

    res.status(201).json({ message: "Order placed", orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// get orders for admin or user
router.get("/", requireAuth, async (req, res) => {
  try {
    // for admin, we might fetch all. Here just fetch user's orders:
    const userId = req.user.id;
    const [orders] = await pool.query("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
