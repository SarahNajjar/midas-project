// controllers/PaymentController.js

// Import the payment service for handling payment-related business logic.
const paymentService = require('../services/paymentService');

// Define the PaymentController class to manage payment operations.
class PaymentController {

    // Retrieves all payments and renders them to a view
    async getPayments(req, res) {
        try {
            const payments = await paymentService.getPayments(); // Fetch payments from the service
            res.render('payments', { payments, user: req.session.user }); // Render paymentsList.ejs with payments and user data
        } catch (error) {
            console.error('Error fetching payments:', error);
            // res.status(500).json({ message: 'Internal server error' }); // Commented out to use rendering instead
            res.render('error', { message: 'Internal server error' }); // Render error.ejs with an error message
        }
    }


    // Retrieves a specific payment by its ID and renders it to a view
    async getPaymentById(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Parse the ID from the URL parameter
            const payment = await paymentService.getPaymentById(id); // Fetch the payment details

            if (payment) {
                res.render('payments', { payment, user: req.session.user }); // Render paymentDetails.ejs with payment and user data
            } else {
                res.render('error', { message: 'Payment not found.' }); // Render error.ejs if payment doesn't exist
            }
        } catch (error) {
            console.error('Error fetching payment:', error);
            // res.status(500).json({ message: 'Internal server error' }); // Commented out to use rendering instead
            res.render('error', { message: 'Internal server error' }); // Render error.ejs with an error message
        }
    }


    // Fetch and render payments for a student
    async getStudentPayments(req, res) {
        try {
            const registrationId = parseInt(req.params.registration_id, 10); // Parse registration_id
            console.log('Parsed registrationId:', registrationId);

            if (isNaN(registrationId)) {
                console.error('Invalid registrationId:', req.params.registration_id);
                return res.status(400).send({ message: 'Invalid registration ID provided.' });
            }

            const payments = await paymentService.getPaymentsByRegistrationId(registrationId);
            res.render('payments', { payments });
        } catch (error) {
            console.error('Error fetching payments for registration:', error);
            res.status(500).render('error', { message: 'Failed to fetch payments for the registration.' });
        }
    }

    // Creates a payment (Admin only)
    async createPayment(req, res) {
        try {
            const payment = await paymentService.createPayment(req);
            res.status(201).json({ message: 'Payment created successfully', payment });
        } catch (error) {
            console.error('Error creating payment:', error);
            res.status(400).json({ message: error.message });
        }
    }

    // Updates a payment (Admin only)
    async updatePayment(req, res) {
        try {
            // Check if the user exists and is an admin
            const user = req.body.user; // Assuming the user object is passed in the request body
            if (user && user.type === 'admin') {
                const id = parseInt(req.params.id, 10); // Parse the payment ID from the URL parameter
                const { registration_id, amount, date, method, transaction_id } = req.body;

                // Call the service to update the payment
                const success = await paymentService.updatePayment(id, {
                    registration_id,
                    amount,
                    date,
                    method,
                    transaction_id,
                });

                if (success) {
                    // Redirect to the payments list after a successful update
                    return res.redirect('/payments');
                    // res.status(200).json({ message: 'Payment updated successfully' }); // Commented: Response as JSON for API
                } else {
                    // Render error view if the payment update failed
                    return res.render('error', { message: 'Payment update failed. Payment not found.' });
                    // res.status(404).json({ message: 'Payment not found' }); // Commented: Response as JSON for API
                }
            }

            // If the user is not an admin, render an access denied error page
            res.render('error', { message: 'Access denied. Only admins can update payments.' });
            // res.status(403).json({ message: 'Access denied. Only admins can update payments.' }); // Commented: For API usage
        } catch (error) {
            console.error('Error updating payment:', error);

            // Render error view with a friendly message
            res.render('error', { message: 'Internal server error while updating payment.' });
            // res.status(500).json({ message: 'Internal server error' }); // Commented: Response as JSON for API
        }
    }

    // Deletes a payment by its ID.
    async deletePayment(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await paymentService.deletePayment(id);
            res.json({ message: 'Payment deleted successfully' });
        } catch (error) {
            console.error('Error deleting payment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async editForm(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const payment = await paymentService.getPaymentById(id); // Assuming you have a `paymentService` with `getPaymentById`
            if (payment) {
                res.render('updatePayment', { payment }); // Render updatePayment.ejs
            } else {
                res.render('error', { message: 'Payment not found.' }); // Render error.ejs
            }
        } catch (error) {
            console.error('Error fetching payment for editing:', error);
            res.render('error', { message: 'Internal server error' }); // Render error.ejs
        }
    }

}

// Export an instance of PaymentController.
module.exports = new PaymentController();
