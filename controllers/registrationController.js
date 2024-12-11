// controllers/RegistrationController.js

// Import the registration service for handling registration-related logic.
const registrationService = require('../services/registrationService');

// Define the RegistrationController class to manage course registrations.
class RegistrationController {


    // Retrieves all registrations.
    async getRegistrations(req, res) {
        try {
            const registrations = await registrationService.getRegistrations();
            res.json(registrations);
        } catch (error) {
            console.error('Error fetching registrations:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createRegistration(req, res) {
        try {
            const { user_id, course_id, date, status } = req.body;

            // Validate input
            if (!user_id || !course_id) {
                return res.status(400).json({ message: 'user_id and course_id are required' });
            }

            // Call the service to create a new registration
            const newRegistration = await registrationService.createRegistration({
                user_id,
                course_id,
                date, // Optional: Defaults handled in service
                status, // Optional: Defaults handled in service
            });

            // Respond with the created registration
            res.status(201).json(newRegistration);
        } catch (error) {
            console.error('Error creating registration:', error);

            // Handle duplicate entry error
            if (error.message.includes('Duplicate entry')) {
                return res.status(409).json({ message: 'You are already registered for this course' });
            }

            // Handle general errors
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async isUserEnrolled(req, res) {
        const { user_id, course_id } = req.query;

        // Validate the input parameters
        if (!user_id || !course_id) {
            return res.status(400).json({ message: 'user_id and course_id are required' });
        }

        try {
            // Check if the user is enrolled in the course
            const isEnrolled = await registrationService.isUserRegistered(user_id, course_id);

            // Respond with the enrollment status
            res.json({ isEnrolled });
        } catch (error) {
            console.error('Error checking enrollment status:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    // Updates an existing registration by its ID.
    async updateRegistration(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { user_id, course_id, date, status } = req.body;
            await registrationService.updateRegistration(id, { user_id, course_id, date, status });
            res.json({ message: 'Registration updated successfully' });
        } catch (error) {
            console.error('Error updating registration:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    // Deletes a registration by its ID.
    async deleteRegistration(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await registrationService.deleteRegistration(id);
            res.json({ message: 'Registration deleted successfully' });
        } catch (error) {
            console.error('Error deleting registration:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// Export an instance of RegistrationController.
module.exports = new RegistrationController();
