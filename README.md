# Little Lemon Restaurant - Table Reservation App

A React-based web application for table reservations at Little Lemon Restaurant. This project demonstrates modern React development practices including form validation, accessibility, responsive design, and comprehensive unit testing.

## 🎯 Project Overview

This application allows customers to reserve tables at Little Lemon Restaurant through an intuitive, accessible, and responsive web interface.

## ✨ Features

- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Accessible (WCAG 2.1 AA)** - Full keyboard navigation, ARIA labels, screen reader support
- ✅ **Form Validation** - Comprehensive client-side validation with clear error messages
- ✅ **Unit Tests** - High test coverage with Jest and React Testing Library
- ✅ **Modern UI/UX** - Clean, intuitive design following best practices
- ✅ **React Router** - Multi-page navigation
- ✅ **State Management** - useReducer for managing available time slots

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd little-lemon-react
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
little-lemon-react/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # Reusable components
│   │   ├── Header.js          # Navigation header
│   │   ├── Footer.js          # Site footer
│   │   └── BookingForm.js     # Reservation form (main feature)
│   ├── pages/                  # Page components
│   │   ├── Home.js            # Landing page
│   │   ├── Reservations.js    # Booking page
│   │   └── ConfirmedBooking.js # Confirmation page
│   ├── utils/                  # Utility functions
│   │   └── validation.js      # Form validation logic
│   ├── __tests__/             # Test files
│   │   └── BookingForm.test.js # Comprehensive tests
│   ├── App.js                  # Main app component
│   ├── App.css                 # Styles
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🎨 Design Decisions

### Color Palette
- **Primary**: `#495E57` (Green)
- **Secondary**: `#F4CE14` (Yellow)
- **Background**: `#EDEFEE` (Light Gray)
- **Highlight**: `#EE9972` (Peach)

### Typography
- **Font**: Karla (Google Fonts)
- Clean, readable sans-serif font optimized for web

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators
- Error messages with `role="alert"`
- High contrast ratios (WCAG AA compliant)
- Responsive text sizing

## 🔧 Form Validation

The booking form includes comprehensive validation:

### Date Validation
- Required field
- Must be a future date
- Cannot select past dates

### Time Validation
- Required field
- Selection from available time slots

### Guests Validation
- Required field
- Minimum: 1 guest
- Maximum: 10 guests
- Must be a valid number

### Name Validation
- Required field
- Minimum 2 characters

### Email Validation
- Required field
- Must be valid email format

All validations show clear, helpful error messages to guide users.

## 🧪 Testing Strategy

### Unit Tests
- Component rendering tests
- Form validation tests
- User interaction tests
- Accessibility tests
- Edge case handling

### Test Coverage
- Form component: 100%
- Validation utilities: 100%
- User interactions: Complete coverage

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Edge Cases Handled

1. **Direct navigation to confirmation page**: Redirects to booking form
2. **Invalid form submission**: Prevents submission and shows errors
3. **Empty fields**: Clear validation messages
4. **Invalid data types**: Type-specific error messages
5. **Out-of-range values**: Boundary validation with helpful messages

## 📝 Code Quality

- **Clear naming conventions**: Descriptive variable and function names
- **Comments**: JSDoc-style comments on all major functions
- **Component structure**: Single responsibility principle
- **Reusable utilities**: Separated validation logic
- **Consistent formatting**: ESLint configuration

## 🎯 Performance Optimizations

- Code splitting with React Router
- Optimized re-renders
- Minimal dependencies
- Production build optimizations

## 🚢 Deployment

This app can be deployed to:

- **Netlify**: `npm run build` then drag & drop `build` folder
- **Vercel**: Connect GitHub repo for automatic deployments
- **GitHub Pages**: Use `gh-pages` package
- **Any static hosting**: Upload contents of `build` folder

## 📄 License

This project is for educational purposes as part of the Front-End Developer Certificate program.

## 👨‍💻 Development

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (irreversible)

### Future Enhancements

- Backend API integration
- Real-time availability checking
- Email confirmation system
- Payment integration
- Booking management dashboard

## 🤝 Contributing

This is an educational project for peer review. Feedback and suggestions are welcome!

## 📧 Contact

For questions or feedback, please use the GitHub repository issues.

---

**Built with ❤️ using React**
