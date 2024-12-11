// services/InstructorService.js

const { initDB } = require('../config/database');
const Instructor = require('../models/instructorModel');

class InstructorService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initializes the database connection pool.
    async init() {
        this.pool = await initDB();
    }

    // Fetches all instructors from the database.
    async getInstructors() {
        const [rows] = await this.pool.query('SELECT * FROM instructors');
        return rows.map(Instructor.fromRow);
    }

    // Fetches an instructor by their ID.
    async getInstructorById(id) {
        const [rows] = await this.pool.query('SELECT * FROM instructors WHERE instructor_id = ?', [id]);
        if (rows.length === 0) return 'Instructor id not found.';
        return Instructor.fromRow(rows[0]);
    }

    // Creates a new instructor in the database.
    async createInstructor(instructorData) {
        const { user_id, bio, specialization } = instructorData;
        const [result] = await this.pool.query(
            'INSERT INTO instructors (instructor_user_id, instructor_bio, instructor_specialization) VALUES (?, ?, ?)',
            [user_id, bio, specialization]
        );
        return { id: result.insertId, user_id, bio, specialization };
    }

    // Updates an existing instructor by their ID.
    async updateInstructor(id, instructorData) {
        const { user_id, bio, specialization } = instructorData;
        const [result] = await this.pool.query(
            'UPDATE instructors SET instructor_user_id = ?, instructor_bio = ?, instructor_specialization = ? WHERE instructor_id = ?',
            [user_id, bio, specialization, id]
        );
        return result.affectedRows > 0;
    }

    // Deletes an instructor by their ID.
    async deleteInstructor(id) {
        const [result] = await this.pool.query('DELETE FROM instructors WHERE instructor_id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new InstructorService();
