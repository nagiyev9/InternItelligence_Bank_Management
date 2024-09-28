// Path And Imports
const authService = require('../services/auth-service');
const cardService = require('../services/card-service');

// Register 
exports.register = async (req, res) => {
    const user = req.body;
    try {
        const newUser = await authService.register(user);
        res.json(newUser);
    } catch (error) {
        res.status(500).json(error)
        console.log('Register Error', error);
    };
};

// Access Token 
exports.refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        if (!refreshToken) {
            return res.status(403).json({ status: 403, message: "No refresh token provided!" });
        };

        const result = await authService.refreshAccessToken(refreshToken);

        if (result.status === 200) {
            res.status(200).json({
                status: 200,
                message: "Access token refreshed successfully",
                accessToken: result.accessToken
            });
        } else {
            res.status(result.status).json({ status: result.status, message: result.message });
        };
    } catch (error) {
        res.status(500).json(error)
        console.log('Token Error', error);
    };
};

// Login 
exports.login = async (req, res) => {
    const user = req.body;
    try {
        const result = await authService.login(user);

        if (result.status === 200) {
            res.status(200).json({
                status: result.status,
                message: result.message,
                user: result.user,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        };

        if (result.status === 403) {
            res.status(403).json({
                status: result.status,
                message: result.message,
            });
        };

        if (result.status === 404) {
            res.status(404).json({
                status: result.status,
                message: result.message,
            });
        };
    } catch (error) {
        res.status(500).json(error)
        console.log('Login', error);
    };
};

// Logout 
exports.logout = async (req, res) => {
    const { userID } = req.user;
    try {
        const result = await authService.logout(userID);
        res.status(200).json({ message: 'Logout Successfull' });
    } catch (error) {
        res.status(500).json(error)
        console.log('Register Error', error);
    };
};

// Delete Account 
exports.deleteAccount = async (req, res) => {
    const { userID } = req.user;
    try {
        const checkCard = await cardService.getCardByUserID(userID);

        if (checkCard.length !== 0) {
            return res.status(400).json({ message: "We have found some cards in this account. You must remove the cards before remove account!" });
        };

        const result = await authService.deleteAccount(userID);
        res.status(200).json({ message: 'Account removed' });
    } catch (error) {
        res.status(500).json(error)
        console.log('Delete Error', error);
    };
};