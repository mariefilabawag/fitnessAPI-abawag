const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verify } = require('../auth');

// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Get user details (protected)
router.get('/details', verify, userController.getDetails);

module.exports = router;