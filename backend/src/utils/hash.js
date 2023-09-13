const bcrypt = require('bcrypt');

// Function to generate password hash using bcrypt
const generateHashPassword = async (password) => {
     try {
       const saltRounds = 10;
       const hash = await bcrypt.hash(password, saltRounds);
       return hash;
     } catch (error) {
       throw new Error('Error generating password hash:', error);
     }
}

module.exports = {
   generateHashPassword
}
