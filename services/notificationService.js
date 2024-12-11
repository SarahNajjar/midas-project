// services/NotificationService.js

const { initDB } = require('../config/database');
const Notifications = require('../models/notificationModel');

class NotificationService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initializes the database connection pool.
    async init() {
        this.pool = await initDB();
    }

    // Fetches all notifications for a specific user.
    async getNotifications(userId) {
        const [rows] = await this.pool.query('SELECT * FROM notifications WHERE notification_user_id = ?', [userId]);
        if (rows.length === 0) return 'User id not found';
        return rows.map(Notifications.fromRow);
    }

    // Saves a new notification to the database.
    async saveNotification(notificationData) {
        const { user_id, type, message, sent_at, read_status } = notificationData;
        const [result] = await this.pool.query(
            'INSERT INTO notifications (notification_user_id, notification_type, notification_message, notification_sent_at, notification_read_status) VALUES (?, ?, ?, ?, ?)',
            [user_id, type, message, sent_at, read_status]
        );
        return { id: result.insertId, ...notificationData };
    }

    // Marks a notification as read by updating its read status.
    async markNotificationAsRead(notificationId) {
        const [result] = await this.pool.query(
            'UPDATE notifications SET notification_read_status = ? WHERE notification_id = ?',
            ["read", notificationId]
        );
        return result.affectedRows > 0;
    }

    // Deletes a notification by its ID.
    async deleteNotification(notificationId) {
        const [result] = await this.pool.query('DELETE FROM notifications WHERE notification_id = ?', [notificationId]);
        return result.affectedRows > 0; 
    }
}

module.exports = new NotificationService();
