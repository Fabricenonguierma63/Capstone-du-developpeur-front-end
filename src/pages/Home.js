import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home page component
 * Landing page with hero section and call-to-action
 */
function Home() {
  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-heading">
        <h1 id="hero-heading">Welcome to Little Lemon</h1>
        <p>
          Experience authentic Mediterranean cuisine in the heart of Chicago.
          Reserve your table today for an unforgettable dining experience.
        </p>
        <Link 
          to="/reservations" 
          className="cta-button"
          aria-label="Reserve a table at Little Lemon"
        >
          Reserve a Table
        </Link>
      </section>

      <section aria-labelledby="about-heading">
        <h2 id="about-heading" className="visually-hidden">About Us</h2>
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '16px',
          marginTop: '2rem' 
        }}>
          <h3 style={{ color: '#495E57', marginBottom: '1rem' }}>Our Story</h3>
          <p style={{ lineHeight: '1.8' }}>
            Little Lemon is a family-owned Mediterranean restaurant, focused on 
            traditional recipes served with a modern twist. Our chefs bring you 
            the best ingredients and authentic flavors from the Mediterranean region.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
