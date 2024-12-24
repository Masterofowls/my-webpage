import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Service from "./Service";
import Design from "./Design";
import Contact from "./Contact";
import "./WebpageDesign.css";

const WebpageDesign = () => {
  return (
    <Router>
      <div className="main">
        <div className="navbar">
          <div className="icon">
            <h2 className="logo">LMSFrog</h2>
          </div>

          <div className="menu">
            <ul>
              <li><Link to="/">DASHBOARD</Link></li>
              <li><Link to="/about">COURSES</Link></li>
              <li><Link to="/service">USER</Link></li>
              <li><Link to="/design">CHAT</Link></li>
              <li><Link to="/contact">CONTACT</Link></li>
            </ul>
          </div>

          <div className="search">
            <input className="srch" type="search" placeholder="Type To text" />
            <button className="btn">Search</button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/design" element={<Design />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default WebpageDesign;
