// About.jsx
import React from "react";
import "./About.css";

const cards = [
  {
    title: "Mountain View",
    copy: "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
    button: "View Trips",
  },
  {
    title: "To The Beach",
    copy: "Plan your next beach trip with these fabulous destinations",
    button: "View Trips",
  },
  {
    title: "Desert Destinations",
    copy: "It's the desert you've always dreamed of",
    button: "Book Now",
  },
  {
    title: "Explore The Galaxy",
    copy: "Seriously, straight up, just blast off into outer space today",
    button: "Book Now",
  },
];

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p className="description">Learn more about our journey, mission, and values!</p>
      <main className="page-content">
        {cards.map((card, index) => (
          <div key={index} className={`card card-${index + 1}`}>
            <div className="content">
              <h2 className="title">{card.title}</h2>
              <p className="copy">{card.copy}</p>
              <button className="btn">{card.button}</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default About;
