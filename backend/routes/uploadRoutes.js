import express from "express";
import multer from "multer";
import path from "path";
import { pool } from "../db.js";

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/"); // Folder where images are stored
  },
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST route to upload image and save in DB
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const imageUrl = `/uploads/${req.file.filename}`;

    // Save the image URL in your MySQL table (create a table named 'images')
    const [result] = await pool.query("INSERT INTO images (image_url) VALUES (?)", [imageUrl]);

    res.json({
      message: "Image uploaded successfully",
      imageUrl,
      id: result.insertId,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ error: "Server error during upload" });
  }
});

export default router;
