// validators/registrationValidator.js
const { body, param, validationResult } = require('express-validator');

const validateRegistration = [
    // Middleware to validate the request body for creating or updating a registration.
    body('user_id')
        .isInt()
        .withMessage('User ID must be an integer')
        .notEmpty()
        .withMessage('User ID is required'),
    body('course_id')
        .isInt()
        .withMessage('Course ID must be an integer')
        .notEmpty()
        .withMessage('Course ID is required'),
    body('date')
        .isISO8601()
        .withMessage('Date must be a valid date')
        .notEmpty()
        .withMessage('Date is required'),
    body('status')
        .isString()
        .withMessage('Status must be a string')
        .isIn(['confirmed', 'pending', 'cancelled'])
        .withMessage('Status must be one of the following: confirmed, pending, or cancelled')
        .notEmpty()
        .withMessage('Status is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateRegistrationId = [
    // Validates the registration ID parameter in the request URL.
    param('id').isInt().withMessage('Registration ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateRegistration,
    validateRegistrationId
};
