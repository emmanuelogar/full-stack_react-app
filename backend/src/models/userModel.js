const connection = require('./connection');

//import { generateHashPassword } from '../utils/hash';
const hash = require('../utils/hash');

const getAll = async () => {
     const [users] = await connection.execute('SELECT * FROM users');
     return users;
};

const getById = async (iduser) => {
     const query = 'SELECT * FROM users WHERE iduser = ?';
     const [user] = await connection.execute(query, [iduser]);
     return user;
};

const createUser = async (user) => {
     const { username, password, email } = user;

     // Creates the hash for the passed password
     const hashPassword = await hash.generateHashPassword(password);

     // Insert user data into the database
     const query = 'INSERT INTO users(username, password, email) VALUES (?,?,?)';
     const [createdUser] = await connection.execute(query, [username, hashPassword, email]);

     // Returns only the entered ID
     return {insertId: createdUser.insertId};
}

// Method that updates a database user
const updateUser = async(iduser, user) => {
     const { username, password } = user;

     const [updatedUser] = await connection.execute('UPDATE users SET username = ?, password = ? WHERE iduser = ?', [username, password, iduser]);
     return updatedUser;
};

// Method that deletes a user from the db
const deleteUser = async(iduser) => {
     const [removedUser] = await connection.execute('DELETE FROM users WHERE iduser = ?', [iduser]);
     return removedUser;
};


module.exports = {
     getAll,
     getById,
     createUser,
     updateUser,
     deleteUser,
};
