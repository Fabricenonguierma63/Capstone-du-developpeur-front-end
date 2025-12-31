import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import ConfirmedBooking from './pages/ConfirmedBooking';
import './App.css';

/**
 * Main App component with routing
 * Implements React Router for navigation between pages
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/confirmed" element={<ConfirmedBooking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
