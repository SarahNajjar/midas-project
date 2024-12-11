// validators/instructorValidator.js
const { body, param, validationResult } = require('express-validator');

const validateInstructor = [
    // Middleware to validate the request body for creating or updating an instructor.
    body('user_id')
        .isInt()
        .withMessage('User ID must be an integer')
        .notEmpty()
        .withMessage('User ID is required'),
    body('bio')
        .isString()
        .withMessage('Bio must be a string')
        .notEmpty()
        .withMessage('Bio is required'),
    body('specialization')
        .isString()
        .withMessage('Specialization must be a string')
        .notEmpty()
        .withMessage('Specialization is required'),

    // Processes validation errors and returns a 400 response if any are present.
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateInstructorId = [
    // Validates the ID parameter in the request URL.
    param('id')
        .isInt()
        .withMessage('ID must be an integer'),

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
    validateInstructor,
    validateInstructorId
};
