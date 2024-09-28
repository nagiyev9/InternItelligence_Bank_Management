// Path 
const express = require('express');

// Router 
const router = express.Router();

// Imports 
const authController = require('../controllers/auth-controller');
const limiter = require('../middlewares/limiter');
const { validate_register, handle_validation_errors } = require('../middlewares/validation');
const authenticateToken = require('../middlewares/auth');


// Login 
router.post('/login', limiter, authController.login);

// Register
router.post('/register', validate_register, handle_validation_errors, authController.register);

// Logout
router.post('/logout', authenticateToken, authController.logout);

// Delete Account
router.delete('/delete', authenticateToken, authController.deleteAccount);

// Refresh Token 
router.post('/refresh-token', authController.refreshAccessToken);

module.exports = router;