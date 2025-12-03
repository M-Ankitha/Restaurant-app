import {pool} from "../db.js";

// ✅ Fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products");
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ✅ Fetch single product by ID
export const getProductById = async (req, res) => {
  try {
    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (product.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(product[0]);
  } catch (err) {
    console.error("Get product by ID error:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
