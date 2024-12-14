// services/PaymentService.js
const { initDB } = require('../config/database');
const Payment = require('../models/paymentModel');

class PaymentService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initializes the database connection pool.
    async init() {
        this.pool = await initDB();
    }

    // Fetches all payments from the database.
    async getPayments() {
        const [rows] = await this.pool.query('SELECT * FROM payments');
        return rows.map(Payment.fromRow);
    }

    // Fetches a payment by its ID.
    async getPaymentById(id) {
        const [rows] = await this.pool.query('SELECT * FROM payments WHERE payment_id = ?', [id]);
        if (rows.length === 0) return 'Payment id not found';
        return Payment.fromRow(rows[0]);
    }

    async getPaymentsByRegistrationId(registrationId) {
        try {
            if (!registrationId || isNaN(registrationId)) {
                console.error('Invalid registrationId in service:', registrationId);
                throw new Error('Registration ID must be a valid number.');
            }

            const query = `
                SELECT 
                    p.payment_id, 
                    p.payment_amount, 
                    p.payment_date, 
                    p.payment_method, 
                    p.payment_transaction_id 
                FROM 
                    payments p
                INNER JOIN 
                    registrations r ON p.payment_registration_id = r.registration_id
                WHERE 
                    r.registration_id = ?`; // Use registration_id for filtering

            console.log('Executing query with registrationId:', registrationId);

            const [results] = await this.pool.query(query, [registrationId]);
            return results;
        } catch (error) {
            console.error('Database error while fetching payments:', error);
            throw new Error('Failed to fetch payments for the registration.');
        }
    }



    // Creates a new payment in the database.
    // Creates a new payment.
    async createPayment(req) {
        try {
            console.log('Request body:', req.body);
            const { registration_id, amount, date, method, transaction_id } = req.body;

            // Validate that all fields are present
            if (!registration_id || !amount || !date || !method || !transaction_id) {
                console.error('Missing required fields in request body:', req.body);
                throw new Error('All payment fields are required.');
            }

            const query = `
                INSERT INTO payments 
                (payment_registration_id, payment_amount, payment_date, payment_method, payment_transaction_id) 
                VALUES (?, ?, ?, ?, ?)`;

            console.log('Executing query:', query);
            console.log('Query parameters:', [registration_id, amount, date, method, transaction_id]);

            const [result] = await this.pool.query(query, [
                registration_id,
                amount,
                date,
                method,
                transaction_id,
            ]);

            console.log('Payment created successfully:', result);
            return result;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw new Error('Failed to create payment.');
        }
    }

    // Updates an existing payment by its ID.
    async updatePayment(id, paymentData) {
        const { registration_id, amount, date, method, transaction_id } = paymentData;
        const [result] = await this.pool.query(
            'UPDATE payments SET payment_registration_id = ?, payment_amount = ?, payment_date = ?, payment_method = ?, payment_transaction_id = ? WHERE payment_id = ?',
            [registration_id, amount, date, method, transaction_id, id]
        );
        return result.affectedRows > 0;
    }

    // Deletes a payment by its ID.
    async deletePayment(id) {
        const [result] = await this.pool.query('DELETE FROM payments WHERE payment_id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new PaymentService();
