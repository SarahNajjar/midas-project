// validators/adminActionValidator.js
const { body, param, validationResult } = require('express-validator');

const validateAdminAction = [
    // Validates the request body for creating or updating an admin action.
    body('admin_id')
        .isInt()
        .withMessage('Admin ID must be an integer')
        .notEmpty()
        .withMessage('Admin ID is required'),
    body('type')
        .isString()
        .withMessage('Action type must be a string')
        .notEmpty()
        .withMessage('Action type is required'),
    body('date')
        .isISO8601()
        .withMessage('Action date must be in the format YYYY-MM-DD')
        .notEmpty()
        .withMessage('Action date is required'),
    body('details')
        .isString()
        .withMessage('Details must be a string')
        .notEmpty()
        .withMessage('Details are required'),
    
    // Handles the validation errors and returns a 400 response if there are any.
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateAdminActionId = [
    // Validates the ID parameter in the request URL.
    param('id')
        .isInt()
        .withMessage('ID must be an integer'),
    
    // Handles the validation errors and returns a 400 response if there are any.
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateAdminAction,
    validateAdminActionId
};
