import React from 'react';
import { useLocation, Link } from 'react-router-dom';

/**
 * ConfirmedBooking page component
 * Displays confirmation message after successful booking
 */
function ConfirmedBooking() {
  const location = useLocation();
  const booking = location.state?.booking;

  // Handle case where user navigates directly without booking
  if (!booking) {
    return (
      <div className="confirmation">
        <div className="confirmation-card">
          <h2>No Booking Found</h2>
          <p>Please make a reservation first.</p>
          <Link to="/reservations" className="cta-button">
            Make a Reservation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation">
      <div className="confirmation-card" role="status" aria-live="polite">
        <div className="success-icon" aria-hidden="true">✓</div>
        <h2>Booking Confirmed!</h2>
        <p>Thank you for your reservation at Little Lemon.</p>
        
        <div className="booking-details" aria-label="Booking details">
          <h3 style={{ 
            color: '#495E57', 
            marginBottom: '1rem', 
            textAlign: 'center' 
          }}>
            Your Reservation Details
          </h3>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Number of Guests:</strong> {booking.guests}</p>
          <p><strong>Occasion:</strong> {booking.occasion}</p>
          {booking.specialRequests && (
            <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
          )}
        </div>

        <p style={{ marginTop: '2rem', color: '#666' }}>
          A confirmation email has been sent to {booking.email}.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/" className="cta-button">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmedBooking;
