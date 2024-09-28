// Path 
const mongoose = require('mongoose');

// Schema
const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        require: false
    },
    expiresAt: {
        type: Date,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});

// Model
const Token = mongoose.model('refreshTokens', TokenSchema);

module.exports = Token;