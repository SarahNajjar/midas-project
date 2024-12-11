// models/AdminAction.js


// Represents an action taken by an admin in the system.

class AdminAction {
    
    // Creates an instance of AdminAction.
    constructor(id, admin_id, type, date, details) {
        this.id = id;
        this.admin_id = admin_id;
        this.type = type;
        this.date = date;
        this.details = details;
    }

    
    // Converts a database row to an AdminAction instance.
    static fromRow(row) {
        return new AdminAction(
            row.action_id,
            row.action_admin_id,
            row.action_type,
            row.action_date,
            row.action_details
        );
    }
}

// Export the AdminAction class.
module.exports = AdminAction;
