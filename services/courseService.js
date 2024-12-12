// services/CourseService.js

const { initDB } = require('../config/database');
const Course = require('../models/courseModel');

class CourseService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initializes the database connection pool.
    async init() {
        this.pool = await initDB();
    }

    // Fetches all courses from the database.
    async getCourses(search) {
        let query = 'SELECT * FROM courses';
        const params = [];

        if (search) {
            query += ' WHERE course_name LIKE ? OR course_instrument LIKE ?';
            const searchTerm = `%${search}%`; // Add wildcard for partial matching
            params.push(searchTerm, searchTerm);
        }

        const [rows] = await this.pool.query(query, params);
        return rows.map(Course.fromRow);
    }


    // Fetches a course by its ID.
    async getCourseById(courseId) {
        const [rows] = await this.pool.query(
            `SELECT courses.*, instructors.instructor_name 
         FROM courses 
         LEFT JOIN instructors 
         ON courses.course_instructor_id = instructors.instructor_id 
         WHERE courses.course_id = ?`,
            [courseId]
        );
        if (rows.length === 0) return 'Course id not found';
        return Course.fromRow(rows[0]);
    }

    // Creates a new course in the database.
    async createCourse(courseData) {
        const { name, instrument, desc, duration, schedule, prerequisities, instructor_id } = courseData;
        const [result] = await this.pool.query(
            'INSERT INTO courses (course_name, course_instrument, course_description, course_duration, course_schedule, course_prerequisites, course_instructor_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, instrument, desc, duration, schedule, prerequisities, instructor_id]
        );
        return { id: result.insertId, name, instrument, desc, duration, schedule, prerequisities, instructor_id };
    }

    // Updates an existing course by its ID.
    async updateCourse(courseId, courseData) {
        const { name, instrument, desc, duration, schedule, prerequisities, instructor_id } = courseData;
        const [result] = await this.pool.query(
            'UPDATE courses SET course_name = ?, course_instrument = ?, course_description = ?, course_duration = ?, course_schedule = ?, course_prerequisites = ?, course_instructor_id = ? WHERE course_id = ?',
            [name, instrument, desc, duration, schedule, prerequisities, instructor_id, courseId]
        );
        return result.affectedRows > 0;
    }

    // Deletes a course by its ID.
    async deleteCourse(courseId) {
        const [result] = await this.pool.query('DELETE FROM courses WHERE course_id = ?', [courseId]);
        return result.affectedRows > 0;
    }

}

module.exports = new CourseService();
