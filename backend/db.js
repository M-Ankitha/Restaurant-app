
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "food_ordering",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
pool.getConnection()
  .then(conn => {
    console.log("DB connected!");
    conn.release();
  })
  .catch(err => console.error("DB connection error:", err));