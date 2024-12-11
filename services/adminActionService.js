// services/AdminActionService.js

const { initDB } = require('../config/database');
const AdminAction = require('../models/adminActionModel');

class AdminActionService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initializes the database connection pool.
    async init() {
        this.pool = await initDB();
    }

    // Fetches all admin actions from the database.
    async getAdminActions() {
        const [rows] = await this.pool.query('SELECT * FROM admin_actions');
        return rows.map(AdminAction.fromRow);
    }

    // Fetches an admin action by its ID.
    async getAdminActionById(actionId) {
        const [rows] = await this.pool.query('SELECT * FROM admin_actions WHERE action_id = ?', [actionId]);
        return rows.length ? AdminAction.fromRow(rows[0]) : null;
    }


    // Creates a new admin action in the database.
    async createAdminAction(actionData) {
        const { admin_id, type, date, details } = actionData;
        const [result] = await this.pool.query(
            `INSERT INTO admin_actions 
             (action_admin_id, action_type, action_date, action_details) 
             VALUES (?, ?, ?, ?)`,
            [admin_id, type, date, details]
        );
        return { id: result.insertId, ...actionData };
    }


    // Updates an existing admin action by its ID.
    async updateAdminAction(actionId, actionData) {
        const { admin_id, type, date, details } = actionData;
        const [result] = await this.pool.query(
            `UPDATE admin_actions 
             SET action_admin_id = ?, action_type = ?, action_date = ?, action_details = ? 
             WHERE action_id = ?`,
            [admin_id, type, date, details, actionId]
        );
        return result.affectedRows > 0;
    }


    // Deletes an admin action by its ID.
    async deleteAdminAction(actionId) {
        const [result] = await this.pool.query('DELETE FROM admin_actions WHERE action_id = ?', [actionId]);
        return result.affectedRows > 0;
    }
}

module.exports = new AdminActionService();
