import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

// ✅ Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, hash]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
