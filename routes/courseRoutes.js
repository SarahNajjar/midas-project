const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { validateCourse, validateCourseId } = require('../validators/courseDTO');  // Import validators

router.get('/manageCourses', (req, res) => courseController.getCourses(req, res));

router.get('/edit-course/:id', validateCourseId, courseController.editCourseForm);
// Route to display the Add Course form
router.get('/add-course', async (req, res) => courseController.addCourseForm(req, res));

// Route to handle Add Course form submission
router.post('/add-course', validateCourse, async (req, res) => courseController.createCourse(req, res));

// Route to create a new course.
router.post('/', validateCourse, courseController.createCourse);

// Route to get all courses.
router.get('/', (req, res) => courseController.getCourses(req, res));

// Route to get a course by ID.
router.get('/courseDetails/:id', validateCourseId, courseController.getCourseById);

router.post('/update-course/:id', validateCourseId, validateCourse, courseController.updateCourse);

// Route to delete a course by ID.
router.get('/delete-course/:id', validateCourseId, courseController.deleteCourse);

// Route to delete a course by ID.
router.get('/:id', validateCourseId, courseController.deleteCourse);

module.exports = router;
