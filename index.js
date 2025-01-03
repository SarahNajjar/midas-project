const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminActionRoutes = require('./routes/adminActionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes for rendering views
app.get('/', (req, res) => res.render('homePage'));
app.get('/login', (req, res) => res.render('login'));
app.get('/studentProfile/:id', (req, res) => res.render('studentProfile'));
app.get('/instructorProfile', (req, res) => res.render('instructorProfile'));
app.get('/adminProfile', (req, res) => res.render('adminProfile'));
app.get('/register', (req, res) => res.render('register'));
app.get('/payments/:registration_id', (req, res) => {
    res.render(`/api/payments/registrations/${req.params.registration_id}/payments`);
});

app.get('/availableCourses', (req, res) => res.render('availableCourses'));
app.get('/manageCourses', (req, res) => res.render('manageCourses'));
app.get('/manageUsers', (req, res) => res.render('manageUsers'));
app.get('/analytics', (req, res) => res.render('analytics'));
app.get('/registrations', (req, res) => res.render('registrations'));

// Mount API routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin-actions', adminActionRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page not found.' });
});

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
