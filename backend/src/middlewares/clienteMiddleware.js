// This file is responsible for validating the data that will be transmitted to the database, that is, from front to back
const validateFieldName = (request, response, next) => {
    // Extract the body of the request
    const { body } = request;

    // Check if the name was passed correctly
    if (body.name === undefined) {
        // Returns a message if the name is not passed
        return response.status(400).json({ message: 'The "name" field needs to be filled in.'});
    }

    // Check if the name was passed correctly
    if (body.name === '') {
        // Returns a message if the name is empty
        return response.status(400).json({ message: 'The "name" field cannot be empty.'});
    }

    // If everything is correct, move on to the next middleware
    next();
};

// Export the file contents for external use
module.exports = {
    validateFieldName,
};
