// validators/paymentValidator.js
const { body, param, validationResult } = require('express-validator');

const validatePayment = [
    // Middleware to validate the request body for creating or updating a payment.
    body('registration_id')
        .isInt()
        .withMessage('Registration ID must be an integer')
        .notEmpty()
        .withMessage('Registration ID is required'),
    body('amount')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('Amount must be a decimal number with up to two decimal places')
        .notEmpty()
        .withMessage('Amount is required'),
    body('date')
        .isISO8601()
        .withMessage('Date must be in the format YYYY-MM-DD')
        .notEmpty()
        .withMessage('Date is required'),
    body('method')
        .isString()
        .withMessage('Payment method must be a string')
        .isIn(['credit card', 'paypal', 'bank transfer'])
        .withMessage('Payment method must be one of the following: credit card, paypal, or bank transfer')
        .notEmpty()
        .withMessage('Payment method is required'),
    body('transaction_id')
        .isString()
        .withMessage('Transaction ID must be a string')
        .notEmpty()
        .withMessage('Transaction ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validatePaymentId = [
    // Validates the payment ID parameter in the request URL.
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
    validatePayment,
    validatePaymentId
};
