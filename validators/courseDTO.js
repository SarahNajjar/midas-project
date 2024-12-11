// validators/courseValidator.js
const { body, param, validationResult } = require('express-validator');

const validateCourse = [
    // Middleware to validate the request body for creating or updating a course.
    body('name')
        .isString()
        .withMessage('Course name must be a string')
        .notEmpty()
        .withMessage('Course name is required'),
    body('instrument')
        .isString()
        .withMessage('Instrument must be a valid string')
        .notEmpty()
        .withMessage('Instrument is required'),
    body('desc')
        .isString()
        .withMessage('Description must be a string')
        .notEmpty()
        .withMessage('Description is required'),
    body('duration')
        .isInt({ min: 1 })
        .withMessage('Duration must be a positive integer (number of hours or days)'),
    body('schedule')
        .isString()
        .withMessage('Schedule must be a string')
        .notEmpty()
        .withMessage('Schedule is required'),
    body('prerequisities')
        .optional()
        .isString()
        .withMessage('Prerequisites must be a string if provided')
        .notEmpty()
        .withMessage("Prerequisities is required"),
    body('instructor_id')
        .isInt()
        .withMessage('Instructor ID must be an integer')
        .notEmpty()
        .withMessage('Instructor ID is required'),
    
    // Processes validation errors and returns a 400 response if any are present.
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCourseId = [
    // Validates the ID parameter in the request URL.
    param('id')
        .isInt()
        .withMessage('Course ID must be an integer'),

    // Processes validation errors and returns a 400 response if any are present.
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateCourse,
    validateCourseId
};
