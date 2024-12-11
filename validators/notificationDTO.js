const { body, param, validationResult } = require('express-validator');

const validateNotificationData = [
    // Middleware to validate the request body for creating or updating a notification.
    body('user_id')
        .isInt()
        .withMessage('User ID must be an integer')
        .notEmpty()
        .withMessage('User ID is required'),
    body('type')
        .isString()
        .withMessage('Type must be a string')
        .notEmpty()
        .withMessage('Type is required'),
    body('message')
        .isString()
        .withMessage('Message must be a string')
        .notEmpty()
        .withMessage('Message is required'),
    body('sent_at')
        .isISO8601()
        .withMessage('Sent at must be a valid date')
        .notEmpty()
        .withMessage('Sent date is required'),
    body('read_status')
        .isString()
        .withMessage('Read status must be a string')
        .isIn(['read', 'unread'])
        .withMessage('Read status must be one of the following: read or unread')
        .notEmpty()
        .withMessage('Read status is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateNotificationId = [
    param('notificationId')
        .notEmpty()
        .withMessage('Notification id not found')
        .isInt()
        .withMessage('Notification ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserId = [
    param('userId')
        .isInt()
        .withMessage('User ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateNotificationData,
    validateNotificationId,
    validateUserId
};
