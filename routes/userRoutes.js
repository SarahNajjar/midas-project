const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../validators/userDTO');

const router = express.Router();

// Define specific routes first
router.get('/manageUsers', (req, res) => userController.getUsers(req, res)); // Fetch and render users
router.get('/studentProfile/:id', (req, res) => userController.renderUserProfile(req, res));
router.get('/instructorProfile/:id', (req, res) => userController.renderUserProfile(req, res));
router.get('/adminProfile/:id', (req, res) => userController.renderUserProfile(req, res));
router.get('/addUser', (req, res) => res.render('addUser'));
// Define dynamic routes later
router.get('/:id', validateUserId, (req, res) => userController.getUserById(req, res));
router.post('/update-user/:id', validateUserId, (req, res) => userController.updateUser(req, res));
router.get('/delete/:id', validateUserId, userController.deleteUser);
router.get('/edit-form/:id', validateUserId, (req, res) => userController.editForm(req, res));


// Other routes
router.post('/register', (req, res) => userController.createUser(req, res));
router.post('/login', (req, res) => userController.loginUser(req, res));

module.exports = router;
