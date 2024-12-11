const express = require('express');
const notificationController = require('../controllers/notificationController');
const { validateUserId, validateNotificationId, validateNotificationData } = require('../validators/notificationDTO'); // Import validators

const router = express.Router();

// Route to get notifications for a specific user.
router.get('/:userId', validateUserId, (req, res) => notificationController.getNotifications(req, res));

// Route to save a new notification.
router.post('/', validateNotificationData, notificationController.saveNotification);

// Route to mark a notification as read.
router.put('/:notificationId/read', validateNotificationId, (req, res) => notificationController.markNotificationAsRead(req, res));

// Route to delete a notification by ID.
router.delete('/:notificationId', validateNotificationId, notificationController.deleteNotification);

module.exports = router;
