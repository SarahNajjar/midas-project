// controllers/NotificationController.js

// Import the notification service for notification-related business logic.
const notificationService = require('../services/notificationService');

// Define the NotificationController class to manage user notifications.
class NotificationController {

    
    // Retrieves notifications for a specific user.
    async getNotifications(req, res) {
        try {
            const userId = req.params.userId;
            const notifications = await notificationService.getNotifications(userId);
            res.json(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Saves a new notification.
    async saveNotification(req, res) {
        try {
            const notificationData = req.body;
            const notification = await notificationService.saveNotification(notificationData);
            res.status(201).json(notification);
        } catch (error) {
            console.error('Error saving notification:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Marks a notification as read by ID.
    async markNotificationAsRead(req, res) {
        try {
            const notificationId = req.params.notificationId;
            const result = await notificationService.markNotificationAsRead(notificationId);
            if (result) {
                res.json({ message: 'Notification marked as read' });
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // async deleteNotification(req, res) {
    //     try {
    //         const id = parseInt(req.params.id, 10);
    //         const result = await notificationService.deleteNotification(id);
    //         if (result) {
    //             res.json({ message: 'Notification deleted successfully' });
    //         } else {
    //             res.status(404).json({ message: `Notification id ${id} not found` });
    //         }
    //     } catch (error) {
    //         console.error('Error deleting notification:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }
    async deleteNotification(req, res) {
        try {
            const notificationId = parseInt(req.params.notificationId, 10);
            await notificationService.deleteNotification(notificationId);
            res.json({ message: 'Notification deleted successfully' });
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new NotificationController();
