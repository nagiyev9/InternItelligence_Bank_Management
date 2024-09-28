// Path 
const express = require('express');

// Router 
const router = express.Router();

// Imports
const authRouter = require('./auth');
const cardRouter = require('./card');
const historyRouter = require('./transicion-history');

// Auth
router.use('/auth', authRouter);

// Card
router.use('/card', cardRouter);

// History
router.use('/history', historyRouter);

module.exports = router;