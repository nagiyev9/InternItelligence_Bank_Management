// Path 
const express = require('express');

// Router 
const router = express.Router();

// Imports
const historyController = require('../controllers/history-controller');
const authenticateToken = require('../middlewares/auth');

// GET
router.get('/all/:id', authenticateToken, historyController.getAllHistory);

module.exports = router;