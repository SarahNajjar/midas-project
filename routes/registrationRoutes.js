const express = require('express');
const registrationController = require('../controllers/registrationController');
const { validateRegistration } = require('../validators/registrationDTO'); // Import validator

const router = express.Router();

// Route to get all registrations (GET)
router.get('/', (req, res) => registrationController.getRegistrations(req, res));

// Route to check if the user is enrolled in a course (GET)
router.get('/status', (req, res) => registrationController.isUserEnrolled(req, res));

// Route to create a new registration (POST)
router.post('/', validateRegistration, (req, res) => registrationController.createRegistration(req, res));

// Route to update a registration by ID (POST)
router.post('/update', validateRegistration, (req, res) => registrationController.updateRegistration(req, res));

// Route to delete a registration by ID (POST)
router.get('/delete', (req, res) => registrationController.deleteRegistration(req, res));

module.exports = router;
