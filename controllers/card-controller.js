// Path And Imports
const cardService = require('../services/card-service');
const userService = require('../services/auth-service');
const { generateCardNumber, generateCVV, generateExpireDate } = require('../utils/generate-card-details');
const bcrypt = require('bcrypt');
const TransicionHistory = require('../models/Transicition-History');

// Get Card By User ID
exports.getCardByUserID = async (req, res) => {
    const { userID } = req.user;
    try {
        const isExist = await userService.getUserByID(userID);

        if (!isExist) {
            return { message: "User couldn't found!" };
        };

        const card = await cardService.getCardByUserID(userID);

        if (card.length === 0) {
            return res.status(200).json({ message: "You don't have card already!" });
        };
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
};

// Create New Card
exports.createNewCard = async (req, res) => {
    const { userID } = req.user
    const { phoneNumber } = req.body;
    try {
        const account = await userService.getUserByID(userID);

        if (!account) {
            return { message: "User couldn't found!" };
        };

        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone number required!' });
        }

        const newCardNumber = Number(`41554741${generateCardNumber()}`);

        const newCard = await cardService.createCard({
            cardNumber: newCardNumber,
            cvv: generateCVV(),
            expireDate: generateExpireDate(),
            phoneNumber: phoneNumber,
            userID: account._id
        });

        res.status(200).json({
            message: "Card created successfully",
            card: newCard
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
};

// Set Password And Activate The Card
exports.setPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const { userID } = req.user;
    try {
        const isExist = await cardService.getCardByID(id);

        if (!isExist) {
            return res.status(404).json({ message: "Card couldn't found!" });
        };

        if (isExist.userID._id.toString() !== userID.toString()) {
            return res.status(400).json({ message: "You do not have permisson to activate this card!" });
        };

        if (isExist.isActive === true) {
            return res.status(400).json({ message: "This card alread activated!" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required!" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        await cardService.setPassword(id, { password: hashedPassword, isActive: true });
        res.status(200).json({ message: 'Card activated' });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
};

// Remove Card
exports.removeCard = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    try {
        const isExist = await cardService.getCardByID(id);

        if (!isExist) {
            return res.status(404).json({ message: "Card couldn't found!" });
        };

        if (isExist.userID._id.toString() !== userID.toString()) {
            return res.status(400).json({ message: "You do not have permission to remove this card" });
        };

        await TransicionHistory.deleteMany({ cardID: id });
        await cardService.deleteCard(id);
        res.status(200).json({ message: "Card Removed" });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
};

// Increase Balance
exports.increaseBalance = async (req, res) => {
    const { userID } = req.user;
    const { id } = req.params;
    const { balance } = req.body;
    try {
        if (!balance || isNaN(balance)) {
            return res.status(400).json({ message: "Amount required and must be a number!" });
        } else if (balance <= 1) {
            return res.status(400).json({ message: "Amount might be equal or greater than 1" });
        };

        const isExist = await cardService.getCardByID(id);

        if (!isExist) {
            return res.status(404).json({ message: "Card coludn't found!" });
        };

        if (userID.toString() !== isExist.userID._id.toString()) {
            return res.status(400).json({ message: "You do not have permission to deposit!" });
        };

        if (isExist.isActive === false) {
            return res.status(400).json({ message: "Your card has not been activated!" });
        };

        const newBalance = isExist.balance + balance

        const increase = await cardService.increaseAndDecreaseBalance(id, { balance: newBalance });

        await new TransicionHistory({
            cardID: isExist._id,
            action_name: "Increase Balance",
            recieverCard: isExist._id,
            amount: balance,
            sendDate: new Date()
        }).save();

        res.status(200).json({
            message: "Deposit successfull",
            balance: increase.balance
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
};

// Decrease Balance --> Withdraw And Payment
exports.decreaseBalance = async (req, res) => {
    const { userID } = req.user;
    const { id } = req.params;
    const { balance, reciever } = req.body;
    try {
        if (!balance || isNaN(balance)) {
            return res.status(400).json({ message: "Amount required and must be a number!" });
        } else if (balance <= 1) {
            return res.status(400).json({ message: "Amount might be equal or greater than 1" });
        };

        const isExist = await cardService.getCardByID(id);

        if (!isExist) {
            return res.status(404).json({ message: "Card coludn't found!" });
        };

        if (userID.toString() !== isExist.userID._id.toString()) {
            return res.status(400).json({ message: "You do not have permission to deposit!" });
        };

        if (isExist.isActive === false) {
            return res.status(400).json({ message: "Your card has not been activated!" });
        };

        if (balance > isExist.balance) {
            return res.status(400).json({ message: "You don't have enough money" });
        };

        const newBalance = isExist.balance - balance

        const increase = await cardService.increaseAndDecreaseBalance(id, { balance: newBalance });

        await new TransicionHistory({
            cardID: isExist._id,
            action_name: reciever ? "Payment" : "Withdraw",
            sender: reciever ? isExist.cardNumber : null,
            reciever: reciever ? reciever : null,
            amount: balance,
            sendDate: new Date()
        }).save();

        res.status(200).json({
            message: reciever ? "Payment successfull" : "Withdraw successfull",
            balance: increase.balance
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
};

// Send To Other Card
exports.sendToOtherCard = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    const { recieverCard, balance } = req.body;
    try {
        const isExist = await cardService.getCardByID(id);

        if (!isExist) {
            return res.status(400).json({ message: "This card doesn't exist!" });
        };
        
        if (isExist.userID._id.toString() !== userID.toString()) {
            return res.status(400).json({ message: "You don't have permission to send money!" });
        };

        const checkReciever = await cardService.getCardByCardNumber(recieverCard);

        if (!checkReciever) {
            return res.status(404).json({ message: "Card couldn't found!" });
        };

        if (checkReciever.isActive === false || isExist.isActive === false) {
            return checkReciever.isActive === false ? res.status(400).json({ message: "Reciever card has not been activated!" }) : res.status(400).json({ message: "Your card has not been activated!" });
        };

        if (!balance || isNaN(balance)) {
            return res.status(400).json({ message: "Amount required and must be a number!" });
        } else if (balance <= 1) {
            return res.status(400).json({ message: "Amount might be equal or greater than 1" });
        } else if (balance > isExist.balance) {
            return res.status(400).json({ message: "You don't have enough money" });
        };

        const senderBalance = isExist.balance - balance;
        const recieverBalance = checkReciever.balance + balance;

        const decreaseSenderBalance = await cardService.increaseAndDecreaseBalance(id, { balance: senderBalance });
        const increaseRecieverBalance = await cardService.increaseAndDecreaseBalance(checkReciever._id, { balance: recieverBalance });

        await new TransicionHistory({
            cardID: isExist._id,
            action_name: "Money Transaction",
            sender: isExist.cardNumber,
            recieverCard: checkReciever._id,
            amount: balance,
            sendDate: new Date()
        }).save();

        res.status(200).json({
            message: "Transaction compleated",
            balance: senderBalance
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
};