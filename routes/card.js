// Path 
const express = require('express');

// Router 
const router = express.Router();

// Imports
const cardController = require('../controllers/card-controller');
const authenticateToken = require('../middlewares/auth');
const { validate_card_password, handle_validation_errors } = require('../middlewares/card-validation');

// GET
router.get('/all', authenticateToken, cardController.getCardByUserID); // Get All User Cards

// POST
router.post('/create', authenticateToken, cardController.createNewCard); // Create New Card

// PUT
router.put('/set-password/:id', authenticateToken, validate_card_password, handle_validation_errors, cardController.setPassword); // Set Password to New Card And Activate
router.put('/increase/:id', authenticateToken, cardController.increaseBalance); // Increase Card Balance
router.put('/withdraw/:id', authenticateToken, cardController.decreaseBalance); // Withdraw from Card 
router.put('/send/:id', authenticateToken, cardController.sendToOtherCard); // Send Money To Another Card

// DELETE
router.delete('/remove-card/:id', authenticateToken, cardController.removeCard); // Remove Card

module.exports = router;