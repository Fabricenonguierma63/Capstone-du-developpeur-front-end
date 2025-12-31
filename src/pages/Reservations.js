import React, { useReducer } from 'react';
import BookingForm from '../components/BookingForm';

/**
 * Initialize available times
 * In a real app, this would fetch from an API
 */
const initializeTimes = () => {
  return [
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];
};

/**
 * Reducer function for managing available times
 * In a real app, this would fetch times based on selected date
 */
const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // In a real app, fetch available times for the selected date
      // For now, return the same times
      return initializeTimes();
    default:
      return state;
  }
};

/**
 * Reservations page component
 * Contains the booking form with time slot management
 */
function Reservations() {
  const [availableTimes, dispatch] = useReducer(timesReducer, [], initializeTimes);

  return (
    <div className="reservations-page">
      <section className="booking-section" aria-labelledby="booking-heading">
        <h2 id="booking-heading">Reserve a Table</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Fill out the form below to reserve your table at Little Lemon
        </p>
        <BookingForm 
          availableTimes={availableTimes} 
          dispatch={dispatch}
        />
      </section>
    </div>
  );
}

export default Reservations;
