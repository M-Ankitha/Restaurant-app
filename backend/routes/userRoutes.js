import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { pool } from "../db.js";

const router = express.Router();

router.get("/profile", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    //  1. Get user info
    const [userRows] = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [userId]
    );
    const user = userRows[0];

    if (!user) return res.status(404).json({ message: "User not found" });

    //  2. Get user's cart and items
    const [cartRows] = await pool.query(
      "SELECT id FROM carts WHERE user_id = ?",
      [userId]
    );

    let cart = null;
    if (cartRows.length > 0) {
      const cartId = cartRows[0].id;
      const [cartItems] = await pool.query(
        "SELECT product_id, name, price, quantity FROM cart_items WHERE cart_id = ?",
        [cartId]
      );
      cart = { id: cartId, items: cartItems };
    }

    //  3. Get user's orders + order items
    const [orders] = await pool.query(
      "SELECT id, total, paid, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    // Attach order_items to each order
    for (let order of orders) {
      const [items] = await pool.query(
        "SELECT product_id, name, price, quantity FROM order_items WHERE order_id = ?",
        [order.id]
      );
      order.items = items;
    }

    // 4. Send combined response
    res.json({user, cart, orders,});
  } catch (err) {
    console.error("User profile error:", err);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

export default router;
