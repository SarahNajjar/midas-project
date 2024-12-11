// models/Course.js


// Represents a course in the system.
class Course {
    
    // Creates an instance of Course.
    constructor(id, name, instrument, desc, duration, schedule, prerequisities, instructor_id) {
        this.id = id;
        this.name = name;
        this.instrument = instrument;
        this.desc = desc;
        this.duration = duration;
        this.schedule = schedule;
        this.prerequisities = prerequisities;
        this.instructor_id = instructor_id;
    }

    
    // Converts a database row to a Course instance.
    static fromRow(row) {
        return new Course(
            row.course_id,
            row.course_name,
            row.course_instrument,
            row.course_description,
            row.course_duration,
            row.course_schedule,
            row.course_prerequisites,
            row.course_instructor_id
        );
    }
}

// Export the Course class.
module.exports = Course;
