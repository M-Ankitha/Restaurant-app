import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    // check existing
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (rows.length) return res.status(400).json({ message: "Email already used" });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, hash]);
    const userId = result.insertId;

    // create empty cart for user
    await pool.query("INSERT INTO carts (user_id) VALUES (?)", [userId]);

    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: userId, name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const [rows] = await pool.query("SELECT id, name, password_hash FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(400).json({ message: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
