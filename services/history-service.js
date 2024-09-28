// Path And Imports
const TransicionHistory = require("../models/Transicition-History");

// Get All History
exports.getAllHistory = async cardID => {
    return await TransicionHistory.find({
        $or: [
            { cardID: cardID },
            { recieverCard: cardID }
        ]
    })
        .populate('cardID', 'cardNumber -_id')
        .populate('recieverCard', 'cardNumber -_id');
};