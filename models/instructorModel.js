// models/Instructor.js


// Represents an instructor in the system.
class Instructor {
    
    // Creates an instance of Instructor.
    constructor(id, user_id, bio, specialization) {
        this.id = id;
        this.user_id = user_id;
        this.bio = bio;
        this.specialization = specialization;
    }

    
    // Converts a database row to an Instructor instance.
    static fromRow(row) {
        return new Instructor(
            row.instructor_id,
            row.instructor_user_id,
            row.instructor_bio,
            row.instructor_specialization
        );
    }
}

// Export the Instructor class.
module.exports = Instructor;
