// models/Notifications.js


// Represents a notification in the system.
class Notifications {
    
    // Creates an instance of Notifications.
    constructor(id, user_id, type, message, sent_at, read_status) {
        this.id = id;
        this.user_id = user_id;
        this.type = type;
        this.message = message;
        this.sent_at = sent_at;
        this.read_status = read_status;
    }

    
    // Converts a database row to a Notifications instance.
    static fromRow(row) {
        return new Notifications(
            row.notification_id,
            row.notification_user_id,
            row.notification_type,
            row.notification_message,
            row.notification_sent_at,
            row.notification_read_status
        );
    }
}

// Export the Notifications class.
module.exports = Notifications;
