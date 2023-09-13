const clienteModel = require('../models/clienteModel');

const getAll = async (request, response) => {
     const client = await clientModel.getAll();
     return response.status(200).json(cliente);
};

const getById = async (request, response) => {
     const {clientid} = request.params;
     const client = await clientModel.getById(idcliente);
     return response.status(200).json(cliente);
};

const createCliente = async (request, response) => {
     // Execute the Model's createCliente method passing the body
     const createdCliente = await clienteModel.createCliente(request.body);
     // Returns a json response from the insertion operation
     return response.status(201).json(createdCliente);
};

const updateCliente = async (request, response) => {
     // From the request parameters take the id
     const {clientid} = request.params;

     // Executes the update function passing the id passed as a parameter in the URL and the customer data through the body
     await clientModel.updateClient(idcliente, request.body);

     // Returns a status that was successful (204)
     return response.status(204).json();
    
};

const deleteCliente = async (request, response) => {
     // From the request parameters take the id that was passed in the URL
     const {clientid} = request.params;
    
     // Execute the deleteCliente function passing the captured id
     await clienteModel.deleteCliente(idcliente);

     // Returns a status that was successful (200)
     return response.status(200).json();
};

module.exports = {
     getAll,
     getById,
     createCliente,
     updateClient,
     deleteClient,
};
