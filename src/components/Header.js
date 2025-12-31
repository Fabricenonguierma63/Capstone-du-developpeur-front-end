import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component with navigation
 * Implements accessible navigation with ARIA labels and semantic HTML
 */
function Header() {
  return (
    <header role="banner">
      <div className="header-content">
        <Link to="/" className="logo" aria-label="Little Lemon Home">
          🍋 Little Lemon
        </Link>
        <nav role="navigation" aria-label="Main navigation">
          <ul>
            <li>
              <Link to="/" aria-label="Go to home page">Home</Link>
            </li>
            <li>
              <Link to="/reservations" aria-label="Make a reservation">
                Reservations
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
