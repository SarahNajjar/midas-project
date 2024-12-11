// routes/adminActionRoutes.js

const express = require('express');
const adminActionController = require('../controllers/adminActionController');
const { validateAdminAction, validateAdminActionId } = require('../validators/adminActionDTO');

const router = express.Router();

// Route to get all admin actions.
router.get('/', adminActionController.getAdminActions);

// Route to create a new admin action.
router.post('/', validateAdminAction, adminActionController.createAdminAction);

// Route to update an admin action.
router.put('/:id', validateAdminActionId, validateAdminAction, adminActionController.updateAdminAction);

// Route to delete an admin action.
router.delete('/:id', validateAdminActionId, adminActionController.deleteAdminAction);

module.exports = router;
