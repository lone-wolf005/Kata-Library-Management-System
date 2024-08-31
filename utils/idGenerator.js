const { nanoid } = require('nanoid');

// Create a custom NanoID function with only digits (0-9) and a length of 10
const generateNumericId = () => {
    return nanoid(10).replace(/\D/g, '').substring(0, 10); // Ensure only digits and limit to 10 characters
};

// Export the function
module.exports = { generateNumericId };
