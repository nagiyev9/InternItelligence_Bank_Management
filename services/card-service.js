// Path And Imports
const Card = require("../models/Card");

// Get Card By ID
exports.getCardByID = async id => {
    return await Card.findOne({ _id: id })
        .populate('userID', '-__v -password');
};

// Get Card By User ID
exports.getCardByUserID = async userID => {
    return await Card.find({ userID: userID })
        .populate('userID', '-__v -password');
};

// Get Card By CardNumber
exports.getCardByCardNumber = async number => {
    return await Card.findOne({ cardNumber: number });
};

// Create New Card
exports.createCard = async card => {
    return await new Card(card).save();
};

// Set Password And Activate The Card
exports.setPassword = async (id, password) => {
    return await Card.findOneAndUpdate(
        { _id: id },
        password,
        { new: true, runValidators: true }
    );
};

// Delete Card
exports.deleteCard = async id => {
    return await Card.findOneAndDelete({ _id: id });
}; 

// Increase And Decrease Card Balance 
exports.increaseAndDecreaseBalance = async (id, balance) => {
    return await Card.findOneAndUpdate(
        { _id: id },
        balance,
        { new: true, runValidators: true }
    );
};