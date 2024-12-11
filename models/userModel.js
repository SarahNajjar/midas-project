// models/User.js


// Represents a user in the system.
class User {
    
    // Creates an instance of User.
    constructor(id, username, password, email, first_name, last_name, type, created_at, updated_at) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.type = type;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    
    // Converts a database row to a User instance.
    static fromRow(row) {
        return new User(
            row.user_id,
            row.user_username,
            row.user_password_hash,
            row.user_email,
            row.user_first_name,
            row.user_last_name,
            row.user_type,
            row.user_created_at,
            row.user_updated_at
        );
    }
}

// Export the User class.
module.exports = User;
