// services/RegistrationService.js
const { initDB } = require('../config/database');
const Registration = require('../models/registrationModel');

class RegistrationService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initializes the database connection pool.
    async init() {
        this.pool = await initDB();
    }

    // Fetches all registrations from the database.
    async getRegistrations() {
        const [rows] = await this.pool.query('SELECT * FROM registrations');
        return rows.map(Registration.fromRow);
    }

    // Creates a new registration in the database.
    async createRegistration(registrationData) {
        const { user_id, course_id, date, status } = registrationData;

        // Ensure defaults for date and status
        const registrationDate = date || new Date().toISOString().split('T')[0]; // Defaults to today
        const registrationStatus = status || 'confirmed'; // Default status is 'active'

        try {
            // Insert into the database
            const [result] = await this.pool.query(
                'INSERT INTO registrations (registration_user_id, registration_course_id, registration_date, registration_status) VALUES (?, ?, ?, ?)',
                [user_id, course_id, registrationDate, registrationStatus]
            );

            // Return the newly created registration
            return { id: result.insertId, user_id, course_id, date: registrationDate, status: registrationStatus };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Duplicate entry: User is already registered for this course.');
            }
            throw error; // Re-throw other errors
        }
    }


    // Updates an existing registration by its ID.
    async updateRegistration(id, registrationData) {
        const { user_id, course_id, date, status } = registrationData;
        const [result] = await this.pool.query(
            'UPDATE registrations SET registration_user_id = ?, registration_course_id = ?, registration_date = ?, registration_status = ? WHERE registration_id = ?',
            [user_id, course_id, date, status, id]
        );
        return result.affectedRows > 0;
    }

    // Deletes a registration by its ID.
    async deleteRegistration(id) {
        const [result] = await this.pool.query('DELETE FROM registrations WHERE registration_id = ?', [id]);
        return result.affectedRows > 0;
    }

    // Checks if a user is already registered for a course
    async isUserRegistered(user_id, course_id) {
        const [rows] = await this.pool.query(
            'SELECT * FROM registrations WHERE registration_user_id = ? AND registration_course_id = ?',
            [user_id, course_id]
        );
        return rows.length > 0; // Returns true if any rows exist
    }

    async isUserEnrolled(req, res) {
        const { user_id, course_id } = req.query;
        try {
            const isEnrolled = await registrationService.isUserRegistered(user_id, course_id);
            return res.json({ isEnrolled });
        } catch (error) {
            console.error('Error checking enrollment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Registers a user for a course
    // async registerUserToCourse(user_id, course_id) {
    //     const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    //     const status = 'active'; // Default registration status
    //     const [result] = await this.pool.query(
    //         'INSERT INTO registrations (registration_user_id, registration_course_id, registration_date, registration_status) VALUES (?, ?, ?, ?)',
    //         [user_id, course_id, date, status]
    //     );
    //     return result.insertId; // Return the new registration ID
    // }

}

module.exports = new RegistrationService();
