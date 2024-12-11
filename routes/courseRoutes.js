const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { validateCourse, validateCourseId } = require('../validators/courseDTO');  // Import validators

// Route to create a new course.
router.post('/', validateCourse, courseController.createCourse);

// Route to get all courses.
router.get('/', (req, res) => courseController.getCourses(req, res));

// Route to get a course by ID.
router.get('/courseDetails/:id', validateCourseId, courseController.getCourseById);

// Route to update a course by ID.
router.post('/:id', validateCourseId, validateCourse, courseController.updateCourse);

// Route to delete a course by ID.
router.get('/:id', validateCourseId, courseController.deleteCourse);

module.exports = router;
