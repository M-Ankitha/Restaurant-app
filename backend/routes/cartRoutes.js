import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {getCart, addToCart, updateCartItem, removeFromCart, clearCart, removeItemCompletely } from "../controllers/cartController.js";

const router = express.Router();
router.get("/", requireAuth, getCart); 
router.post("/add", requireAuth, addToCart); 
router.put("/update", requireAuth, updateCartItem); 
router.delete("/remove/:product_id", requireAuth, removeFromCart); 
router.delete("/removeAll/:product_id", requireAuth, removeItemCompletely);
router.delete("/clear", requireAuth, clearCart); 
export default router;

 
