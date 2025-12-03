import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const Home = () => {
  const foodImages = [
    "http://localhost:5000/uploads/butterchicken.jpg",
    "http://localhost:5000/uploads/garlicbread.jpg",
    "http://localhost:5000/uploads/springrolls.jpg",
    "http://localhost:5000/uploads/chocolatecake.jpg",
    "http://localhost:5000/uploads/potatowedges.jpg"
  ];
const reviews = [
    { name: "Amrutha", text: "Absolutely loved the food! Fresh, flavorful, and beautifully presented. Highly recommend 🍕" },
    { name: "Sonia", text: "Great variety and quality! Their desserts are a must-try 🍰" },
    { name: "Karan", text: "A delightful culinary experience! The flavors were on point and the staff was super friendly 👌" },
    { name: "Neha", text: "Best dining experience I've had in a while. The ambiance and food were both top-notch 🌟" }
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to <span>Foodies</span></h1>
        <p>Savor the taste, feel the love 🍽️</p>
        <Link to="/menu"><button className="hero-btn">Order Now</button></Link>
      </section>

      {/* Food Slider Section */}
      <section className="slider-section">
        <Slider {...settings}>
          {foodImages.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Food ${index}`} className="food-slide" />
            </div>
          ))}
        </Slider>
        <Link to="/menu">
          <button className="view-menu-btn">View Full Menu</button>
        </Link>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div>
            <i className="fa-solid fa-bowl-food"></i>
            <h3>Fresh Ingredients</h3>
            <p>We use only the best, locally sourced ingredients for every meal.</p>
          </div>
          <div>
            <i className="fa-solid fa-utensils"></i>
            <h3>Authentic Taste</h3>
            <p>Enjoy the perfect blend of flavors crafted by our expert chefs.</p>
          </div>
          <div>
            <i className="fa-solid fa-star"></i>
            <h3>Top Rated</h3>
            <p>Loved by thousands of customers for our taste and service.</p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="reviews">
        <h2>What Our Customers Say</h2>
        <div className="review-cards">
          {reviews.map((rev, index) => (
            <div className="review-card" key={index}>
              <i className="fa-solid fa-user-circle user-icon"></i>
              <h4>{rev.name}</h4>
              <p>"{rev.text}"</p>
            </div>
          ))}
        </div>
      </section>
          

      {/* Popular Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-cards">
          <div className="category">
            <img src="http://localhost:5000/uploads/pizza.jpg" alt="Pizza" />
           <a href="/menu"> <h4>Appetizers</h4> </a>
           
          </div>
          <div className="category">
            <img src="http://localhost:5000/uploads/grilledsalmon.jpg" alt="Main Course" />
            <a href="/menu"><h4>Main Course</h4></a>
          </div>
          <div className="category">
            <img src="http://localhost:5000/uploads/icecream.jpg" alt="Desserts" />
           <a href="/menu"> <h4>Desserts</h4></a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} FoodZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
