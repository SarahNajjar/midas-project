const express = require('express');
const instructorController = require('../controllers/instructorController');
const { validateInstructor, validateInstructorId } = require('../validators/instructorDTO');  // Import validators

const router = express.Router();

// Route to get all instructors.
router.get('/', instructorController.getInstructors);

// Route to create a new instructor.
router.post('/', validateInstructor, instructorController.createInstructor);

// Route to get an instructor by ID.
router.get('/:id', validateInstructorId, instructorController.getInstructorById);

// Route to update an instructor by ID.
router.put('/:id', validateInstructorId, validateInstructor, instructorController.updateInstructor);

// Route to delete an instructor by ID.
router.delete('/:id', validateInstructorId, instructorController.deleteInstructor);

module.exports = router;
