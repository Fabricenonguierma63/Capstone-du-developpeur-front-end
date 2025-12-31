import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';
import { validateDate, validateTime, validateGuests, validateName, validateEmail } from '../utils/validation';

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

/**
 * Helper function to render components with Router
 */
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

/**
 * Test Suite for BookingForm Component
 */
describe('BookingForm Component', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    mockDispatch.mockClear();
  });

  test('renders all form fields', () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  test('submit button is disabled when form is empty', () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const submitButton = screen.getByRole('button', { name: /submit reservation/i });
    expect(submitButton).toBeDisabled();
  });

  test('displays validation error for empty date field', async () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const dateInput = screen.getByLabelText(/date/i);
    
    fireEvent.blur(dateInput);

    await waitFor(() => {
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    });
  });

  test('displays validation error for empty name field', async () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const nameInput = screen.getByLabelText(/full name/i);
    
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    });
  });

  test('displays validation error for invalid email', async () => {
    const user = userEvent.setup();
    
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const emailInput = screen.getByLabelText(/email/i);
    
    await user.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('displays validation error for guests outside range', async () => {
    const user = userEvent.setup();
    
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const guestsInput = screen.getByLabelText(/number of guests/i);
    
    await user.type(guestsInput, '15');
    fireEvent.blur(guestsInput);

    await waitFor(() => {
      expect(screen.getByText(/maximum 10 guests/i)).toBeInTheDocument();
    });
  });

  test('renders available time slots', () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const timeSelect = screen.getByLabelText(/time/i);
    
    mockAvailableTimes.forEach(time => {
      expect(screen.getByRole('option', { name: time })).toBeInTheDocument();
    });
  });

  test('has correct HTML5 validation attributes', () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const dateInput = screen.getByLabelText(/date/i);
    const timeSelect = screen.getByLabelText(/time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);

    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('required');
    expect(timeSelect).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
  });
});

/**
 * Test Suite for Validation Functions
 */
describe('Validation Functions', () => {
  describe('validateDate', () => {
    test('returns error for empty date', () => {
      expect(validateDate('')).toBeTruthy();
    });

    test('returns error for past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const pastDateString = pastDate.toISOString().split('T')[0];
      
      expect(validateDate(pastDateString)).toBeTruthy();
    });

    test('returns no error for future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const futureDateString = futureDate.toISOString().split('T')[0];
      
      expect(validateDate(futureDateString)).toBe('');
    });
  });

  describe('validateTime', () => {
    test('returns error for empty time', () => {
      expect(validateTime('')).toBeTruthy();
    });

    test('returns no error for valid time', () => {
      expect(validateTime('18:00')).toBe('');
    });
  });

  describe('validateGuests', () => {
    test('returns error for empty guests', () => {
      expect(validateGuests('')).toBeTruthy();
    });

    test('returns error for zero guests', () => {
      expect(validateGuests('0')).toBeTruthy();
    });

    test('returns error for negative guests', () => {
      expect(validateGuests('-1')).toBeTruthy();
    });

    test('returns error for more than 10 guests', () => {
      expect(validateGuests('11')).toBeTruthy();
    });

    test('returns no error for valid number (1-10)', () => {
      expect(validateGuests('5')).toBe('');
    });
  });

  describe('validateName', () => {
    test('returns error for empty name', () => {
      expect(validateName('')).toBeTruthy();
    });

    test('returns error for name with less than 2 characters', () => {
      expect(validateName('A')).toBeTruthy();
    });

    test('returns no error for valid name', () => {
      expect(validateName('John Doe')).toBe('');
    });
  });

  describe('validateEmail', () => {
    test('returns error for empty email', () => {
      expect(validateEmail('')).toBeTruthy();
    });

    test('returns error for invalid email format', () => {
      expect(validateEmail('invalid-email')).toBeTruthy();
      expect(validateEmail('invalid@')).toBeTruthy();
      expect(validateEmail('@invalid.com')).toBeTruthy();
    });

    test('returns no error for valid email', () => {
      expect(validateEmail('test@example.com')).toBe('');
    });
  });
});

/**
 * Test Suite for Accessibility
 */
describe('Accessibility Tests', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];
  const mockDispatch = jest.fn();

  test('form has proper ARIA labels', () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const form = screen.getByRole('form', { name: /table reservation form/i });
    expect(form).toBeInTheDocument();
  });

  test('required fields have aria-required attribute', () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const dateInput = screen.getByLabelText(/date/i);
    const timeSelect = screen.getByLabelText(/time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);

    expect(dateInput).toHaveAttribute('aria-required', 'true');
    expect(timeSelect).toHaveAttribute('aria-required', 'true');
    expect(guestsInput).toHaveAttribute('aria-required', 'true');
  });

  test('error messages have role="alert"', async () => {
    renderWithRouter(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
      />
    );

    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.blur(dateInput);

    await waitFor(() => {
      const errorMessage = screen.getByText(/please select a date/i);
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });
});
