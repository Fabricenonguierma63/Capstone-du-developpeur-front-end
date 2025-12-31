/**
 * Validation utilities for booking form
 * Provides comprehensive validation functions with clear error messages
 */

/**
 * Validate date field
 * Must be a future date
 */
export const validateDate = (date) => {
  if (!date) {
    return 'Please select a date';
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return 'Please select a future date';
  }

  return '';
};

/**
 * Validate time field
 * Must not be empty
 */
export const validateTime = (time) => {
  if (!time) {
    return 'Please select a time';
  }
  return '';
};

/**
 * Validate number of guests
 * Must be between 1 and 10
 */
export const validateGuests = (guests) => {
  if (!guests) {
    return 'Please enter number of guests';
  }

  const numGuests = parseInt(guests, 10);

  if (isNaN(numGuests)) {
    return 'Please enter a valid number';
  }

  if (numGuests < 1) {
    return 'Minimum 1 guest required';
  }

  if (numGuests > 10) {
    return 'Maximum 10 guests allowed. Please contact us for larger parties.';
  }

  return '';
};

/**
 * Validate name field
 * Must not be empty and contain at least 2 characters
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return 'Please enter your name';
  }

  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }

  return '';
};

/**
 * Validate email field
 * Must be a valid email format
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Please enter your email';
  }

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return '';
};
