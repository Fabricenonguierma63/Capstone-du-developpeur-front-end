import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateDate, validateTime, validateGuests, validateName, validateEmail } from '../utils/validation';

/**
 * BookingForm component
 * Implements table reservation form with comprehensive validation
 * Follows accessibility best practices (ARIA labels, error messages)
 */
function BookingForm({ availableTimes, dispatch }) {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: 'birthday',
    name: '',
    email: '',
    specialRequests: ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({});
  
  // Touched fields (for showing errors only after user interaction)
  const [touched, setTouched] = useState({});

  /**
   * Handle input change
   * Updates form data and triggers validation for touched fields
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update available times when date changes
    if (name === 'date' && dispatch) {
      dispatch({ type: 'UPDATE_TIMES', date: value });
    }

    // Validate field if it has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  /**
   * Handle field blur (mark as touched)
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  /**
   * Validate individual field
   */
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'date':
        error = validateDate(value);
        break;
      case 'time':
        error = validateTime(value);
        break;
      case 'guests':
        error = validateGuests(value);
        break;
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return error === '';
  };

  /**
   * Validate entire form
   */
  const validateForm = () => {
    const newErrors = {};
    
    newErrors.date = validateDate(formData.date);
    newErrors.time = validateTime(formData.time);
    newErrors.guests = validateGuests(formData.guests);
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);

    setErrors(newErrors);

    // Return true if no errors
    return Object.values(newErrors).every(error => error === '');
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      date: true,
      time: true,
      guests: true,
      name: true,
      email: true
    });

    // Validate form
    if (validateForm()) {
      // Navigate to confirmation page with booking data
      navigate('/confirmed', { state: { booking: formData } });
    } else {
      // Focus on first error field for accessibility
      const firstErrorField = Object.keys(errors).find(key => errors[key]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
    }
  };

  /**
   * Check if form is valid (all fields filled and no errors)
   */
  const isFormValid = () => {
    return (
      formData.date &&
      formData.time &&
      formData.guests &&
      formData.name &&
      formData.email &&
      Object.values(errors).every(error => error === '')
    );
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      aria-label="Table reservation form"
      noValidate
    >
      {/* Date Field */}
      <div className="form-group">
        <label htmlFor="date">
          Date <span aria-label="required">*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={touched.date && errors.date ? 'true' : 'false'}
          aria-describedby={errors.date ? 'date-error' : undefined}
        />
        {touched.date && errors.date && (
          <span id="date-error" className="error-message" role="alert">
            {errors.date}
          </span>
        )}
      </div>

      {/* Time Field */}
      <div className="form-group">
        <label htmlFor="time">
          Time <span aria-label="required">*</span>
        </label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={touched.time && errors.time ? 'true' : 'false'}
          aria-describedby={errors.time ? 'time-error' : undefined}
        >
          <option value="">Select a time</option>
          {availableTimes && availableTimes.map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {touched.time && errors.time && (
          <span id="time-error" className="error-message" role="alert">
            {errors.time}
          </span>
        )}
      </div>

      {/* Number of Guests Field */}
      <div className="form-group">
        <label htmlFor="guests">
          Number of guests <span aria-label="required">*</span>
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          min="1"
          max="10"
          required
          aria-required="true"
          aria-invalid={touched.guests && errors.guests ? 'true' : 'false'}
          aria-describedby={errors.guests ? 'guests-error' : undefined}
        />
        {touched.guests && errors.guests && (
          <span id="guests-error" className="error-message" role="alert">
            {errors.guests}
          </span>
        )}
      </div>

      {/* Occasion Field */}
      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          aria-label="Select occasion for reservation"
        >
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="engagement">Engagement</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name">
          Full Name <span aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={touched.name && errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {touched.name && errors.name && (
          <span id="name-error" className="error-message" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">
          Email <span aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={touched.email && errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {touched.email && errors.email && (
          <span id="email-error" className="error-message" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Special Requests Field */}
      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows="4"
          placeholder="Any dietary restrictions or special requirements?"
          aria-label="Enter any special requests or dietary restrictions"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="submit-button"
        disabled={!isFormValid()}
        aria-label="Submit reservation"
      >
        Make Reservation
      </button>
    </form>
  );
}

export default BookingForm;
