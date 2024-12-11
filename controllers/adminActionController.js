// controllers/adminActionController.js

// Import the admin action service to handle business logic for admin actions.
const adminActionService = require('../services/adminActionService');

// Define the AdminActionController class to manage admin actions.
class AdminActionController {

    
    // Retrieves all admin actions. 
    async getAdminActions(req, res) {
        try {
            const actions = await adminActionService.getAdminActions();
            res.json(actions);
        } catch (error) {
            console.error('Error fetching admin actions:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Creates a new admin action.
    async createAdminAction(req, res) {
        try {
            const action = req.body;
            const newAction = await adminActionService.createAdminAction(action);
            res.status(201).json(newAction);
        } catch (error) {
            console.error('Error creating admin action:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Updates an existing admin action by ID.
    async updateAdminAction(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await adminActionService.updateAdminAction(id, req.body);
            res.json({ message: 'Action updated successfully' });
        } catch (error) {
            console.error('Error updating admin action:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    // Deletes an admin action by ID.
    async deleteAdminAction(req, res) {
        try {
            await adminActionService.deleteAdminAction(req.params.id);
            res.json({ message: 'Action deleted successfully' });
        } catch (error) {
            console.error('Error deleting admin action:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// Export an instance of AdminActionController.
module.exports = new AdminActionController();
