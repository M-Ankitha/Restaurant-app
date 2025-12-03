# 🍽️ Restaurant App

A full-stack *Restaurant Website* built using *React (Frontend)* and *Node.js + Express + MySQL (Backend)*.  
It includes authentication, a persistent cart system, checkout, and PayPal payment integration.

---

## 🚀 Features

- 🧑‍💻 **User Authentication** (Register / Login)
- 🛒 **Add to Cart / Remove / Update Quantity**
- 💾 **Persistent Cart** (Stored in MySQL by user)
- 💳 **Checkout & PayPal Payment Integration**
- 📱 Responsive UI built with React + CSS3
- 🔐 Secure JWT-based authentication
- 🗄️ MySQL Database for products, users, carts, and orders

---

## 🏗️ Project Structure

Restaurant-app/
│
├── backend/
│ ├── controllers/ # Business logic
│ ├── middleware/ # Auth middleware
│ ├── routes/ # Express routes (auth, cart, orders, payment)
│ ├── db.js # MySQL connection setup
│ ├── server.js # Express server entry point
│ └── package.json # Backend dependencies
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Navbar, FoodCard, etc.
│ │ ├── context/ # Cart & Auth contexts
│ │ ├── pages/ # Home, Menu, Cart, Checkout, Login
│ │ ├── App.js
│ │ └── index.js
│ ├── public/
│ └── package.json # Frontend dependencies
│
├── README.md
└── .gitignore

## Install dependencies
Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install

## Running the Project Locally
Start the Backend

In the backend/ folder:

npm run dev


Runs on http://localhost:5000

Start the Frontend

In the frontend/ folder:

npm start


Runs on http://localhost:3000

 ## Database Setup (MySQL)

Run the following SQL commands to create the database and tables:

CREATE DATABASE food_ordering;
USE food_ordering;

-- users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  category VARCHAR(80),
  price DECIMAL(10,2),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- carts
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- cart_items
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  name VARCHAR(200),
  price DECIMAL(10,2),
  quantity INT DEFAULT 1,
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
);

-- orders
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100),
  email VARCHAR(150),
  total DECIMAL(10,2),
  paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

## 🔑 Environment Variables

Create a .env file in the backend folder:

PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=food_ordering
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret

## 💻 Deployment
Frontend

You can deploy the React app to:

Vercel

Netlify

Backend

Deploy your Node.js + MySQL backend to:

Render

Railway
