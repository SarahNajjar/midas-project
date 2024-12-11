// validators/userValidator.js
const { body, param, validationResult } = require('express-validator');

const validateUser = [
    // Middleware to validate the request body for creating or updating a user.
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .notEmpty()
        .withMessage('Username is required'),
    body('password')
        .isString()
        .withMessage('Password must be valid')
        .notEmpty()
        .withMessage('Password is required'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .notEmpty()
        .withMessage('Email is required'),
    body('first_name')
        .isString()
        .withMessage('First name must be a string')
        .notEmpty()
        .withMessage('First name is required'),
    body('last_name')
        .isString()
        .withMessage('Last name must be a string')
        .notEmpty()
        .withMessage('Last name is required'),
    body('type')
        .isString()
        .withMessage('Type must be a string')
        .isIn(['student', 'admin', 'instructor'])
        .withMessage('Type must be one of the following: student, admin, or instructor')
        .notEmpty()
        .withMessage('Type is required'),
    body('created_at')
        .optional()
        .isISO8601()
        .withMessage('created_at must be a valid date'),
    body('updated_at')
        .optional()
        .isISO8601()
        .withMessage('updated_at must be a valid date'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


const validateUserId = [
    // Validates the user ID parameter in the request URL.
    param('id').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUser,
    validateUserId
};
