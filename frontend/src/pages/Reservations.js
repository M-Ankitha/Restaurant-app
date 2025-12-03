import React, { useState } from "react";
import "./Reservations.css";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    requests: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submit: send to backend or context
    console.log("Reservation data:", formData);
    alert("Thank you! Your reservation request has been submitted.");
  };

  return (
    <div className="reservation-page">
      <section className="hero-small">
        <h2>Book a Table</h2>
        <p>Reserve your spot at <strong>FoodZone</strong> & enjoy an unforgettable dining experience.</p>
      </section>

      <section className="reservation-form-section">
        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="guests">Guests</label>
            <input type="number" id="guests" name="guests" min="1" value={formData.guests} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="requests">Special Requests</label>
            <textarea id="requests" name="requests" value={formData.requests} onChange={handleChange} placeholder="Any special requests?" />
          </div>

          <button className="btn-submit" type="submit">Reserve Now</button>
        </form>
      </section>
      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} FoodZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReservationPage;
