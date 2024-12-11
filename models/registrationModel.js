// models/Registration.js


// Represents a registration in the system.
class Registration {
    
    // Creates an instance of Registration.
    constructor(id, user_id, course_id, date, status) {
        this.id = id;
        this.user_id = user_id;
        this.course_id = course_id;
        this.date = date;
        this.status = status;
    }

    
    // Converts a database row to a Registration instance.
    static fromRow(row) {
        return new Registration(
            row.registration_id,
            row.registration_user_id,
            row.registration_course_id,
            row.registration_date,
            row.registration_status
        );
    }
}

// Export the Registration class.
module.exports = Registration;
