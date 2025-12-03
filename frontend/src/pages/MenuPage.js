import React from "react";
import FoodCard from "../components/FoodCard";
import "../components/FoodCard.css";

const foods = [
  { id: 1, category: "Appetizers", name: "Spring Rolls", price: 5 , image :"/uploads/springrolls.jpg"},
  { id: 2, category: "Appetizers", name: "Garlic Bread", price: 4, image :"/uploads/garlicbread.jpg" },
  { id: 3, category: "Appetizers", name: "Potato Wedges", price: 6, image: "/uploads/potatowedges.jpg" },
  { id: 4, category: "Appetizers", name: "Cheese Balls", price: 5, image: "/uploads/cheeseballs.jpg" },
  { id: 5, category: "Main Course", name: "Pizza", price: 10, image: "/uploads/pizza.jpg" },
  { id: 6, category: "Main Course", name: "Grilled Salmon", price: 15, image: "/uploads/grilledsalmon.jpg" },
  { id: 7, category: "Main Course", name: "Ramen", price: 4 , image: "/uploads/ramen.jpg" },
  { id: 8, category: "Main Course", name: "Butter Chicken", price: 4 , image: "/uploads/butterchicken.jpg" },
  { id: 9, category: "Desserts", name: "Chocolate Cake", price: 6 , image: "/uploads/chocolatecake.jpg" },
  { id: 10, category: "Desserts", name: "Ice Cream", price: 4 , image: "/uploads/icecream.jpg" },
  { id: 11, category: "Desserts", name: "Fruit Salad", price: 5 , image: "/uploads/fruitsalad.jpg" },
  { id: 12, category: "Desserts", name: "Apple Strudel", price: 5 , image: "/uploads/applestrudel.jpg" },
  { id: 13, category: "Drinks", name: "Lemonade", price: 3 , image: "/uploads/lemonade.jpg" },
  { id: 14, category: "Drinks", name: "Iced Tea", price: 3 , image: "/uploads/icedtea.jpg" },  
  { id: 15, category: "Drinks", name: "Coffee", price: 2 , image: "/uploads/coffee.jpg" },
  { id: 16, category: "Drinks", name: "Smoothie", price: 4 , image: "/uploads/smoothie.jpg" },

];

const MenuPage = ({ addToCart }) => {
  const categories = ["Appetizers","Main Course","Desserts","Drinks"];
  return (
    <div>
      <h2>Menu</h2>
      {categories.map(cat => (
        <div className="menu-container" key={cat}>
          <h3 className="category-title">{cat}</h3>
          <div className="food-grid">
            {foods.filter(f => f.category === cat).map(item => (
              <FoodCard key={item.id} item={item} addToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}
      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} FoodZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MenuPage;
