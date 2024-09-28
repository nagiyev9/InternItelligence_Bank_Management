// Path
const mongoose = require('mongoose');

// Schema 
const TransicionHistorySchema = mongoose.Schema({
    cardID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cards',
        required: true
    },
    action_name: {
        type: String,
        required: true
    },
    sender: {
        type: Number,
        required: false  
    },
    reciever: {
        type: String,
        required: false
    },
    recieverCard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cards',
    },
    amount: {
        type: Number,
        required: true
    },
    sendDate: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

// Model
const TransicionHistory = mongoose.model('transicion_history', TransicionHistorySchema);

module.exports = TransicionHistory;