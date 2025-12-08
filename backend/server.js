
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ CORS middleware 
app.use(cors({
  origin: "https://ankitha-restaurant-app.netlify.app", //  frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
//  Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  Ensure uploads folder exists
if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "uploads"));
}
// Routes
app.get("/", (req, res) => {
  res.send("API is running successfully ✅");
});
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/paypal", paymentRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/upload", uploadRoutes);

app.post("/api/auth/register", (req, res) => {
  res.status(200).json({ message: "Manual test route reached ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
