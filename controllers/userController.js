const userService = require('../services/userService');

class UserController {
    // Retrieves all users and renders a 'users.ejs' view
    async getUsers(req, res) {
        try {
            const users = await userService.getUsers();
            res.render('manageUsers', { users }); // Render users.ejs with users data
        } catch (error) {
            console.error('Error fetching users:', error);
            res.render('error', { message: 'Internal server error' }); // Render error.ejs
        }
    }

    // Retrieves a specific user by ID and renders the 'userProfile.ejs' view
    async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await userService.getUserById(id);
            if (!user) {
                return res.render('error', { message: 'User not found.' }); // Render error.ejs for missing user
            }
            res.render('userProfile', { user }); // Render userProfile.ejs
        } catch (error) {
            console.error('Error fetching user:', error);
            res.render('error', { message: 'Internal server error' }); // Render error.ejs
        }
    }

    // Creates a new user and redirects to login or renders error
    // async createUser(req, res) {
    //     try {
    //         const { username, password, email, first_name, last_name, type } = req.body;
    //         const newUser = await userService.createUser({ username, password, email, first_name, last_name, type });
    //         if (newUser) {
    //             res.render('login', { successMessage: 'Registration successful! Please log in.' }); // Success message
    //         } else {
    //             res.render('register', { error: 'Registration failed. Please try again.' }); // Registration failed
    //         }
    //     } catch (error) {
    //         console.error('Error creating user:', error);
    //         res.render('error', { message: 'Internal server error' }); // Render error.ejs
    //     }
    // }
    async createUser(req, res) {
        try {
            // Extract user data from the request body
            const { username, password, email, first_name, last_name, type } = req.body;

            // Validate input
            if (!username || !password || !email || !first_name || !last_name || !type) {
                return res.status(400).render('error', { message: 'All fields are required.' });
            }

            // Call the service method to create a new user
            await userService.createUser({
                username,
                password,
                email,
                first_name,
                last_name,
                type,
            });

            // Redirect to the login view after successful registration
            res.render('login');
        } catch (error) {
            // Handle specific errors (e.g., duplicate username/email)
            if (error.message === 'Username or email already exists') {
                return res.status(409).render('error', { message: error.message });
            }

            // Handle general errors
            console.error('Error creating user:', error);
            return res.status(500).render('error', { message: 'Internal server error.' });
        }
    }



    // Updates an existing user by ID and redirects to homepage
    async updateUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await userService.updateUser(id, req.body);
            if (!success) {
                return res.render('error', { message: 'User not found or no changes made.' }); // Render error.ejs
            }
            res.redirect('/'); // Redirect to homepage after update
        } catch (error) {
            console.error('Error updating user:', error);
            res.render('error', { message: 'Internal server error' }); // Render error.ejs
        }
    }

    // Deletes a user by ID and redirects to homepage
    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await userService.deleteUser(id);
            if (!success) {
                return res.render('error', { message: 'User not found.' }); // Render error.ejs
            }
            res.redirect('/'); // Redirect to homepage after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            res.render('error', { message: 'Internal server error' }); // Render error.ejs
        }
    }

    // Renders the edit form for updating a specific user
    async editForm(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await userService.getUserById(id);
            if (user) {
                res.render('updateUser', { user }); // Render updateUser.ejs
            } else {
                res.render('error', { message: 'User not found.' }); // Render error.ejs
            }
        } catch (error) {
            console.error('Error fetching user for editing:', error);
            res.render('error', { message: 'Internal server error' }); // Render error.ejs
        }
    }

    // Handles user login and redirects based on role
    // async loginUser(req, res) {
    //     try {
    //         const { email, password } = req.body;
    //         const user = await userService.loginUser(email, password);
    //         if (user) {
    //             res.json({ success: true, message: 'Login successful', user });
    //             // Redirect for the normal application flow
    //             // res.redirect(`/userProfile?id=${user.user_id}`);
    //         } else {
    //             res.render('login', { error: 'Invalid email or password.' }); // Render login.ejs with error
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //         res.render('login', { error: 'Internal server error. Please try again later.' }); // Render login.ejs
    //     }
    // }
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.loginUser(email, password);

            if (user) {
                // Send JSON response for testing
                // res.json({ success: true, message: 'Login successful', user });
                const id = user.user_id; // Extract the user's ID
                await this.renderUserProfile({ params: { id } }, res);
                //console.log("ieufhoqfn");

                // Redirect for the normal application flow
                //res.redirect(`/userProfile?id=${user.user_id}`);
            } else {
                // Send JSON response for invalid credentials
                //res.status(401).json({ success: false, error: 'Invalid email or password.' });

                // Render login view with an error message
                res.render('login', { error: 'Invalid email or password.' });
            }
        } catch (error) {
            console.error('Error during login:', error);

            // Send JSON response for internal server error
            // res.status(500).json({ success: false, error: 'Internal server error. Please try again later.' });

            // Render login view with an error message
            res.render('login', { error: 'Internal server error. Please try again later.' });
        }
    }

    // Renders the user profile
    async renderUserProfile(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Get user ID from query parameters
            const user = await userService.getUserById(id);
            console.log("hiehddckhbfckq");
            if (user) {
                console.log("hi");
                if (user.type === 'admin') {
                    console.log("User is an admin");
                    res.render('adminProfile', { user: user }); // Render admin view
                } else if (user.type === 'instructor') {
                    console.log("User is an instructor");
                    res.render('instructorProfile', { user: user }); // Render instructor view
                } else if (user.type === 'student') {
                    console.log("User is a student");
                    res.render('studentProfile', { user: user }); // Render student view
                } else {
                    console.log("User type is unknown");
                    res.render('error', { message: 'Role not recognized.' });
                }
            } else {
                res.render('error', { message: 'User not found.' });
            }
        } catch (error) {
            console.error('Error rendering user profile:', error);
            //res.render('error', { message: 'Failed to load user profile.' }); // Render error.ejs
            console.log(error);
        }
    }

    // Handles user registration and redirects to login
    // async registerUser(req, res) {
    //     try {
    //         const { username, password, email, first_name, last_name } = req.body;
    //         const user = await userService.createUser({ username, password, email, first_name, last_name });
    //         console.log("iewfbhwekbvfkdvnkaeuvakj");
    //         if (user) {
    //             res.render('login', { successMessage: 'Registration successful! Please log in.' }); // Render login.ejs
    //         } else {
    //             res.render('register', { error: 'Registration failed. Please try again.' }); // Render register.ejs
    //         }
    //     } catch (error) {
    //         console.error('Error during registration:', error);
    //         res.render('register', { error: 'Internal server error. Please try again later.' }); // Render register.ejs
    //     }
    // }
    // async registerUser(req, res) {
    //     try {
    //         const { username, password, email, first_name, last_name, type } = req.body;

    //         // Validate type
    //         if (!['student', 'instructor', 'admin'].includes(type)) {
    //             return res.render('register', { error: 'Invalid user type. Please select a valid option.' });
    //         }

    //         // Create the user in the database
    //         const user = await userService.createUser({ username, password, email, first_name, last_name, type });
    //         if (user) {
    //             res.redirect('/login'); // Redirect to login after successful registration
    //         } else {
    //             res.render('register', { error: 'Registration failed. Please try again.' });
    //         }
    //     } catch (error) {
    //         console.error('Error during registration:', error);
    //         res.render('register', { error: 'Internal server error. Please try again later.' });
    //     }
    // }


}

module.exports = new UserController();
