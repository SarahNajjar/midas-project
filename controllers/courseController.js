// Import the course service for business logic related to courses.
const courseService = require('../services/courseService');
const instructorsService = require('../services/instructorService');
// Define the CourseController class to manage course-related operations.
class CourseController {


    // Retrieves all courses.
    async getCourses(req, res) {
        try {
            const search = req.query.search;
            const user_id = req.query.user_id; // Expect user_id as part of the query string

            const courses = await courseService.getCourses(search);
            const instructors = await instructorsService.getInstructors();

            // Match instructor names with courses
            courses.forEach(course => {
                const instructor = instructors.find(
                    instructor => instructor.instructor_id === course.instructor_id
                );
                course.instructor_name = instructor ? instructor.instructor_name : 'TBA';
            });

            res.render('availableCourses', { courses, search, user_id });
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).render('error', { message: 'Internal server error' });
        }
    }


    async getCoursesByAdmin(req, res) {
        try {
            const search = req.query.search; // Get the search query
            const courses = await courseService.getCourses(search); // Pass the search term to the service
            const instructors = await instructorsService.getInstructors();

            // Add instructor name to each course based on the instructor ID
            courses.forEach(course => {
                const instructor = instructors.find(
                    instructor => instructor.instructor_id === course.instructor_id
                );
                course.instructor_name = instructor ? instructor.instructor_name : 'N/A';
            });

            res.render('manageCourses', { courses, instructors, search }); // Pass the search term to the view
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).render('error', { message: 'Internal server error' });
        }
    }


    async addCourseForm(req, res) {
        try {
            const instructors = await instructorsService.getInstructors(); // Fetch list of instructors
            res.render('addCourse', { instructors }); // Render the Add Course form
        } catch (error) {
            console.error('Error fetching instructors:', error);
            res.status(500).render('error', { message: 'Internal server error.' });
        }
    }

    // Retrieves a specific course by its ID.
    async getCourseById(req, res) {
        try {
            const courseId = parseInt(req.params.id, 10);
            const course = await courseService.getCourseById(courseId);
            if (!course) {
                return res.status(404).render('error', { message: 'Course not found.' });
            }
            res.render('courseDetails', { course });
        } catch (error) {
            console.error('Error fetching course:', error);
            res.status(500).render('error', { message: 'Internal server error.' });
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
            res.redirect('manageCourses'); // Redirect back to manage courses after creation
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).render('error', { message: 'Internal server error' });
        }
    }


    // Updates an existing course by its ID.
    async updateCourse(req, res) {
        try {
            const courseId = parseInt(req.params.id, 10);
            await courseService.updateCourse(courseId, req.body);
            console.log("success")
            res.redirect('api/courses/manageCourses'); // Redirect back to manage courses after update
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).render('error', { message: 'Internal server error.' });
        }
    }


    // Deletes a course by its ID.
    async deleteCourse(req, res) {
        try {
            const courseId = parseInt(req.params.id, 10);

            if (isNaN(courseId)) {
                return res.status(400).render('error', { message: 'Invalid course ID.' });
            }

            const deleted = await courseService.deleteCourse(courseId);


            if (!deleted) {
                return res.status(404).render('error', { message: 'Course not found.' });
            }

            res.redirect('/api/courses/manageCourses'); // Redirect to manage courses page after deletion
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).render('error', { message: 'Internal server error.' });
        }
    }

    async editCourseForm(req, res) {
        try {
            const courseId = parseInt(req.params.id, 10);
            const course = await courseService.getCourseById(courseId); // Fetch course details
            console.log(course)
            const instructors = await instructorsService.getInstructors(); // Fetch list of instructors

            if (!course) {
                return res.status(404).render('error', { message: 'Course not found.' });
            }

            res.render('updateCourse', { course, instructors }); // Pass data to the view
        } catch (error) {
            console.error('Error fetching course or instructors:', error);
            res.status(500).render('error', { message: 'Internal server error.' });
        }
    }

}

// Export an instance of CourseController.
module.exports = new CourseController();
