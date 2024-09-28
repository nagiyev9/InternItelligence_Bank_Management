// Path And Imports
const historyService = require('../services/history-service');
const cardService = require('../services/card-service');

// Get All History
exports.getAllHistory = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    try {
        const isExist = await cardService.getCardByID(id);

        if (!isExist) {
            return res.status(404).json({ message: "Card could not found!" });
        };

        if (isExist.userID._id.toString() !== userID.toString()) {
            return res.status(400).json({ message: "You do not have permission to see this card history!" });
        };

        const history = await historyService.getAllHistory(id);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);  
    };
};