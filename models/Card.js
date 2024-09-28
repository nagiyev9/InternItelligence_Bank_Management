// Path
const mongoose = require('mongoose');

// Schema 
const CardSchema = mongoose.Schema({
    cardNumber: {
        type: Number,
        unique: true,
        required: true
    },
    cvv: {
        type: Number,
        unique: true,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Model
const Card = mongoose.model('cards', CardSchema);

module.exports = Card;