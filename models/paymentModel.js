// models/Payment.js


// Represents a payment in the system.
class Payment {
    
    // Creates an instance of Payment.
    constructor(id, registration_id, amount, date, method, transaction_id) {
        this.id = id;
        this.registration_id = registration_id;
        this.amount = amount;
        this.date = date;
        this.method = method;
        this.transaction_id = transaction_id;
    }

    
    // Converts a database row to a Payment instance.
    static fromRow(row) {
        return new Payment(
            row.payment_id,
            row.payment_registration_id,
            row.payment_amount,
            row.payment_date,
            row.payment_method,
            row.payment_transaction_id
        );
    }
}

// Export the Payment class.
module.exports = Payment;
