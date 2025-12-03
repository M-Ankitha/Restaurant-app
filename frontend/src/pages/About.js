import React from 'react';  
import './About.css';
const About = () => {
  return (
    <div className="about-page">
    <section className="about-us">
        <h1>About Us</h1>
        <p> At <strong>FoodZone</strong>, we believe that food brings people together.
          Our mission is to serve delicious, freshly made dishes that not only satisfy your hunger
          but also your heart. Whether it’s a family dinner or a solo treat, we make every meal memorable.
        </p>
    </section>
    {/* Our Story */}
      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Founded in 2020, FoodZone began as a small family-run kitchen with one
          dream — to bring the authentic flavors of home-cooked meals to everyone.
          What started as a humble idea quickly grew into a beloved food destination,
          serving hundreds of happy customers every day.
        </p>
      </section>

      {/* Our Values */}
      <section className="our-values">
        <h2>Our Values</h2>
        <div className="value-cards">
          <div className="value-card">
            <i className="fa-solid fa-leaf"></i>
            <h3>Freshness</h3>
            <p>We source our ingredients daily to ensure every bite is pure and flavorful.</p>
          </div>
          <div className="value-card">
            <i className="fa-solid fa-handshake"></i>
            <h3>Trust</h3>
            <p>Your trust is our top priority — from hygiene to honest service.</p>
          </div>
          <div className="value-card">
            <i className="fa-solid fa-heart"></i>
            <h3>Passion</h3>
            <p>Our chefs cook with love, ensuring every dish is crafted to perfection.</p>
          </div>
          <div className="value-card">
            <i className="fa-solid fa-bowl-food"></i>
            <h3>Quality</h3>
            <p>We never compromise on taste, presentation, or satisfaction.</p>
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
export default About;