const userModel = require('../models/userModel');

const getAll = async (request, response) => {
     const user = await userModel.getAll();
     return response.status(200).json(user);
};

const getById = async (request, response) => {
     const { iduser } = request.params;
     const user = await userModel.getById(iduser);
     return response.status(200).json(user);
};

const createUser = async (request, response) => {
     // Execute the Model's createUser method passing the body
     const createdUser = await userModel.createUser(request.body);
     // Returns a json response from the insertion operation
     return response.status(201).json(createdUser);
};

const updateUser = async (request, response) => {
     // From the request parameters take the id
     const { iduser } = request.params;

     // Executes the update function passing the id passed as a parameter in the URL and the user data through the body
     await userModel.updateUser(iduser, request.body);

     // Returns a status that was successful (204)
     return response.status(204).json();
    
};

const deleteUser = async (request, response) => {
     // From the request parameters take the id that was passed in the URL
     const { iduser } = request.params;
    
     // Execute the deleteUser function passing the captured id
     await userModel.deleteUser(iduser);

     // Returns a status that was successful (200)
     return response.status(200).json();
};

module.exports = {
     getAll,
     getById,
     createUser,
     updateUser,
     deleteUser,
};
