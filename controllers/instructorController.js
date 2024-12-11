// controllers/instructorController.js

// Import the instructor service for handling instructor-related business logic.
const instructorService = require('../services/instructorService');

// Define the InstructorController class to manage instructor operations.
class InstructorController {

    
    // Retrieves all instructors.
    async getInstructors(req, res) {
        try {
            const instructors = await instructorService.getInstructors();
            res.json(instructors);
        } catch (error) {
            console.error('Error fetching instructors:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Retrieves an instructor by their ID.
    async getInstructorById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const instructor = await instructorService.getInstructorById(id);
            res.json(instructor);
        } catch (error) {
            console.error('Error fetching instructor:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Creates a new instructor.
    async createInstructor(req, res) {
        try {
            const { user_id, bio, specialization } = req.body;
            const newInstructor = await instructorService.createInstructor({ user_id, bio, specialization });
            res.status(201).json(newInstructor);
        } catch (error) {
            console.error('Error creating instructor:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Updates an existing instructor by ID.
    async updateInstructor(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { user_id, bio, specialization } = req.body;
            await instructorService.updateInstructor(id, { user_id, bio, specialization });
            res.json({ message: 'Instructor updated successfully' });
        } catch (error) {
            console.error('Error updating instructor:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Deletes an instructor by ID.
    async deleteInstructor(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await instructorService.deleteInstructor(id);
            res.json({ message: 'Instructor deleted successfully' });
        } catch (error) {
            console.error('Error deleting instructor:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// Export an instance of InstructorController.
module.exports = new InstructorController();
