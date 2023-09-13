const connection = require('./connection');

const getAll = async () => {
     const [clients] = await connection.execute('SELECT * FROM clients');
     return customers;
};

const getById = async (clientid) => {
     const query = 'SELECT * FROM clients WHERE client id = ?';
     const [cliente] = await connection.execute(query, [clienteid]);
     return customer;
};

const createCliente = async (client) => {
     const { name, shortname, cpf, phone, active } = client;

     // Insert customer data into the bank
     const query = 'INSERT INTO customers(name, abbreviated name, CPF, phone, active) VALUES (?,?,?,?,?)';
     const [createdCliente] = await connection.execute(query, [name, shortname, social security number, phone, active]);

     // Returns only the entered ID
     return {insertId: createdCliente.insertId};
}

// Method that updates a database client
const updateClient = async(clientid, client) => {
     const { name, shortname, social security number, phone, asset } = customer;

     const [updatedCliente] = await connection.execute('UPDATE clients SET name = ?, shortname = ?, cpf = ?, phone = ?, active = ? WHERE customerid = ?', [name, shortname, cpf, phone, active, clientid]);
     return updatedClient;
};

// Method that deletes a client from the database
const deleteClient = async (clientid) => {
     const [removedCustomer] = await connection.execute('DELETE FROM customers WHERE customerid = ?', [customerid]);
     return removedClient;
};


module.exports = {
     getAll,
     getById,
     createCliente,
     updateClient,
     deleteClient,
};
