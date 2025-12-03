import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {getCart, addToCart, updateCartItem, removeFromCart, clearCart,} from "../controllers/cartController.js";

const router = express.Router();
router.get("/", requireAuth, getCart); 
router.post("/add", requireAuth, addToCart); 
router.put("/update", requireAuth, updateCartItem); 
router.delete("/remove/:product_id", requireAuth, removeFromCart); 
router.delete("/clear", requireAuth, clearCart); 
export default router;
/*// get cart for logged user
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    // find cart id
    const [cartRows] = await pool.query("SELECT id FROM carts WHERE user_id = ?", [userId]);
    if (!cartRows.length) return res.json({ items: [] });
    const cartId = cartRows[0].id;
    const [items] = await pool.query("SELECT id, product_id, name, price, quantity FROM cart_items WHERE cart_id = ?", [cartId]);
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// add or increment item
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id=null, name, price, quantity=1 } = req.body;

    const [[cartRow]] = await pool.query("SELECT id FROM carts WHERE user_id = ?", [userId]);
    let cartId = cartRow?.id;
    if (!cartId) {
      const [r] = await pool.query("INSERT INTO carts (user_id) VALUES (?)", [userId]);
      cartId = r.insertId;
    }

    // check if product exists in cart (by product_id or name)
    const [existing] = await pool.query(
      "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND (product_id = ? OR (product_id IS NULL AND name = ?))",
      [cartId, product_id, name]
    );

    if (existing.length) {
      const item = existing[0];
      const newQty = item.quantity + quantity;
      await pool.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [newQty, item.id]);
      return res.json({ message: "Updated quantity", id: item.id, quantity: newQty });
    } else {
      const [r] = await pool.query("INSERT INTO cart_items (cart_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)", [cartId, product_id, name, price, quantity]);
      return res.status(201).json({ message: "Added", id: r.insertId, quantity });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// update specific item quantity
router.put("/", requireAuth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    if (quantity <= 0) {
      await pool.query("DELETE FROM cart_items WHERE id = ?", [itemId]);
      return res.json({ message: "Removed" });
    }
    await pool.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [quantity, itemId]);
    res.json({ message: "Quantity updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// remove an item
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const itemId = req.params.id;
    await pool.query("DELETE FROM cart_items WHERE id = ?", [itemId]);
    res.json({ message: "Removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// clear cart
router.delete("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [[cartRow]] = await pool.query("SELECT id FROM carts WHERE user_id = ?", [userId]);
    if (!cartRow) return res.json({ message: "No cart" });
    await pool.query("DELETE FROM cart_items WHERE cart_id = ?", [cartRow.id]);
    res.json({ message: "Cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;*/
