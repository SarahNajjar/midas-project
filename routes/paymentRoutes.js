const express = require('express');
const paymentController = require('../controllers/paymentController');
const { validatePayment, validatePaymentId } = require('../validators/paymentDTO');

const router = express.Router();

// Define routes
//router.get('/:id', validatePaymentId, (req, res) => paymentController.getPaymentById(req, res)); // Get payment by ID
router.get('/registrations/:registration_id/payments', (req, res) => paymentController.getStudentPayments(req, res)); // Get payments for a registration
router.post('/create', validatePayment, (req, res) => paymentController.createPayment(req, res)); // Create a new payment
router.post('/update/:id', validatePaymentId, validatePayment, (req, res) => paymentController.updatePayment(req, res)); // Update payment by ID
router.get('/delete/:id', validatePaymentId, (req, res) => paymentController.deletePayment(req, res)); // Delete payment by ID
router.get('/edit-form/:id', validatePaymentId, (req, res) => paymentController.editForm(req, res)); // Render edit form

module.exports = router;
