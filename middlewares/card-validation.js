// Imports
const { check, validationResult } = require('express-validator');

// Register Validation
exports.validate_card_password = [
    check('password')
        .isLength({ min: 4, max: 4 })
        .withMessage('Password must have 4 digits')
        .isNumeric()
        .withMessage('You can use only digits!')
];

// Handle Validation Errors
exports.handle_validation_errors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];

        return res.status(400).json({
            field: firstError.param,
            message: firstError.msg
        });
    };
    next();
};