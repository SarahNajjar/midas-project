// services/UserService.js
const { initDB } = require('../config/database');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

class UserService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initializes the database connection pool.
    async init() {
        this.pool = await initDB();
    }

    // Fetches all users from the database.
    async getUsers() {
        const [rows] = await this.pool.query("SELECT * FROM users WHERE user_type != 'admin'");
        return rows.map(User.fromRow);
    }

    // Fetches a user from the database by their ID.
    async getUserById(id) {
        const [rows] = await this.pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length === 0) return null;
        return User.fromRow(rows[0]);
    }

    // Creates a new user in the database.
    async createUser(userData) {
        const { username, password, email, first_name, last_name, type } = userData;

        // Check for duplicate username or email
        const [existingUser] = await this.pool.query(
            'SELECT COUNT(*) AS count FROM users WHERE user_username = ? OR user_email = ?',
            [username, email]
        );

        if (existingUser[0].count > 0) {
            throw new Error('Username or email already exists');
        }

        // Insert the new user into the database
        const [result] = await this.pool.query(
            'INSERT INTO users (user_username, user_password_hash, user_email, user_first_name, user_last_name, user_type, user_created_at, user_updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [username, password, email, first_name, last_name, type]
        );

        // Return non-sensitive user data
        return {
            id: result.insertId,
            username,
            email,
            first_name,
            last_name,
            type,
        };
    }

    // Updates an existing user's information by their ID.
    async updateUser(id, userData) {
        const { username, password, email, first_name, last_name, type } = userData;
        const [result] = await this.pool.query(
            'UPDATE users SET user_username = ?, user_password_hash = ?, user_email = ?, user_first_name = ?, user_last_name = ?, user_type = ?, user_updated_at = NOW() WHERE user_id = ?',
            [username, password, email, first_name, last_name, type, id]
        );
        return result.affectedRows > 0;
    }

    // Deletes a user from the database by their ID.
    async deleteUser(id) {
        const result = await this.pool.query('DELETE FROM users WHERE user_id = ?', [id]);
        return result.affectedRows > 0;
    }

    async loginUser(email, password) {
        try {
            // Query to fetch the user by email
            const [rows] = await this.pool.query(
                'SELECT * FROM users WHERE user_email = ? AND user_password_hash = ?',
                [email, password]
            );

            // Check if the user exists
            if (rows.length === 0) {
                return null; // User not found
            }

            const user = rows[0]; // Retrieve the user record

            // Validate the password using bcrypt
            // const isMatch = await bcrypt.compare(password, user.user_password_hash);

            // if (!isMatch) {
            //     return null; // Password mismatch
            // }

            // Return the user object if email and password are valid
            return user;
        } catch (error) {
            console.error('Error during login:', error.message);
            throw new Error('An error occurred during the login process.');
        }
    }
}

module.exports = new UserService();
