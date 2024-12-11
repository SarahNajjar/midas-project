// config/database.js

// Imports MySQL and dotenv for database connection and environment configuration.
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Loads environment variables.
dotenv.config();

// Connection pool variable.
let pool;


// Initializes and returns a MySQL connection pool.
// Creates a new pool only if it doesn't already exist, using environment variables for configuration.
// Exits the process if unable to connect.
const initDB = async () => {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3307,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        try {
            await pool.getConnection();
            console.log('Connected to MySQL database');
        } catch (error) {
            console.error('Unable to connect to MySQL:', error);
            process.exit(1);
        }
    }
    return pool;
};

// Exports the initDB function for database initialization.
module.exports = { initDB };
