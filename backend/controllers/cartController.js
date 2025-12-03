import {pool} from "../db.js";

// ✅ Get user cart (with items)
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get or create cart for user
    const [cart] = await pool.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    let cartId;

    if (cart.length === 0) {
      const [newCart] = await pool.query("INSERT INTO carts (user_id) VALUES (?)", [userId]);
      cartId = newCart.insertId;
    } else {
      cartId = cart[0].id;
    }

    // Fetch cart items
    const [items] = await pool.query(
      "SELECT id, product_id, name, price, quantity FROM cart_items WHERE cart_id = ?",
      [cartId]
    );

    res.json({ cartId, items });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;
    console.log("Received addToCart:", req.body);
    // Get or create user's cart
    const [cart] = await pool.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    let cartId = cart.length > 0 ? cart[0].id : null;

    if (!cartId) {
      const [newCart] = await pool.query("INSERT INTO carts (user_id) VALUES (?)", [userId]);
      cartId = newCart.insertId;
    }

    // Fetch product info
    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [product_id]);
    if (product.length === 0)
      return res.status(404).json({ message: "Product not found" });

    const { name, price } = product[0];

    // Check if item already in cart
    const [existing] = await pool.query(
      "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, product_id]
    );

    if (existing.length > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?",
        [quantity, cartId, product_id]
      );
    } else {
      await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)",
        [cartId, product_id, name, price, quantity]
      );
    }

    res.json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Failed to add item" });
  }
};

// ✅ Update quantity
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    const [cart] = await pool.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    if (cart.length === 0)
      return res.status(404).json({ message: "Cart not found" });

    await pool.query(
      "UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?",
      [quantity, cart[0].id, product_id]
    );

    res.json({ message: "Quantity updated" });
  } catch (err) {
    console.error("Update cart item error:", err);
    res.status(500).json({ message: "Failed to update item" });
  }
};

// ✅ Remove item
/*export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id } = req.params;

    const [cart] = await pool.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    if (cart.length === 0)
      return res.status(404).json({ message: "Cart not found" });

    await pool.query("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?", [
      cart[0].id,
      product_id,
    ]);

    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("Remove item error:", err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};*/
// ✅ Remove one unit (not entire row unless quantity = 1)
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id } = req.params;

    // Find user's cart
    const [cart] = await pool.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    if (cart.length === 0)
      return res.status(404).json({ message: "Cart not found" });

    const cartId = cart[0].id;

    // Check current quantity
    const [items] = await pool.query(
      "SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, product_id]
    );

    if (!items.length) return res.status(404).json({ message: "Item not in cart" });

    const currentQty = items[0].quantity;

    if (currentQty > 1) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity - 1 WHERE cart_id = ? AND product_id = ?",
        [cartId, product_id]
      );
    } else {
      await pool.query("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?", [
        cartId,
        product_id,
      ]);
    }

    // Return updated cart items
    const [updatedItems] = await pool.query(
      "SELECT id, product_id, name, price, quantity FROM cart_items WHERE cart_id = ?",
      [cartId]
    );

    res.json({ items: updatedItems });
  } catch (err) {
    console.error("Remove item error:", err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};

// ✅ Clear all items
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const [cart] = await pool.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    if (cart.length === 0)
      return res.status(404).json({ message: "Cart not found" });

    await pool.query("DELETE FROM cart_items WHERE cart_id = ?", [cart[0].id]);

    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
