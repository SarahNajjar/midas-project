// Import the course service for business logic related to courses.
const courseService = require('../services/courseService');

// Define the CourseController class to manage course-related operations.
class CourseController {


    // Retrieves all courses.
    async getCourses(req, res) {
        try {
            const courses = await courseService.getCourses();
            // console.log(courses);
            // res.json(courses);
            res.render('courses', { courses });
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Retrieves a specific course by its ID.
    async getCourseById(req, res) {
        try {
            const courseId = parseInt(req.params.id, 10);
            const course = await courseService.getCourseById(courseId);
            //res.json(course);
            if (!course) {
                return res.status(404).send('Course not found');
            }
            res.render('courseDetails', { course });
        } catch (error) {
            console.error('Error fetching course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getCourseDetails(req, res) {
        try {
            const courseId = parseInt(req.params.id, 10); // Extract course ID from the URL
            const course = await courseService.getCourseById(courseId);// Fetch course details
            if (!course) {
                return res.status(404).render('error', { message: 'Course not found.' });
            }
            res.render('courseDetails', { course, user: req.user });
        } catch (error) {
            console.error('Error fetching course details:', error);
            res.status(500).render('error', { message: 'Internal server error.' });
        }
    }

    // Creates a new course.
    async createCourse(req, res) {
        try {
            const newCourse = await courseService.createCourse(req.body);
            res.status(201).json(newCourse);
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    // Updates an existing course by its ID.
    async updateCourse(req, res) {
        try {
            const courseId = parseInt(req.params.id, 10);
            await courseService.updateCourse(courseId, req.body);
            res.json({ message: 'Course updated successfully' });
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    // Deletes a course by its ID.
    async deleteCourse(req, res) {
        try {
            const courseId = parseInt(req.params.id, 10);
            await courseService.deleteCourse(courseId);
            res.json({ message: 'Course deleted successfully' });
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// Export an instance of CourseController.
module.exports = new CourseController();
