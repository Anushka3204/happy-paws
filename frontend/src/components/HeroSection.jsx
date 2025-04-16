import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Find Your New Best Friend </h1>
        <p>Adopt, don’t shop. Give love a home today.</p>
        <Link to="/explore">
          <button>Explore Pets</button>
        </Link>
      </div>
      <div className="hero-background"></div>
    </section>
  );
};

export default HeroSection;
