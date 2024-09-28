// Random Card Number Generator
const generateCardNumber = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomNumber;
};

// Random CVV Generator
const generateCVV = () => {
    const randomCVV = Math.floor(100 + Math.random() * 900);
    return randomCVV;
};

// Expire Date Generator
const generateExpireDate = () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 3);
    return now.toLocaleDateString();
};

module.exports = {
    generateCardNumber,
    generateCVV,
    generateExpireDate
};