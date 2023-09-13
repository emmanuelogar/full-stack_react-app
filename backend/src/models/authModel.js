const connection = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authUser = async (login) => {
     const { username, password } = login;

     try {
         // Search the user by username in the database
         const query = 'SELECT * FROM users WHERE username = ?';
         const [rows] = await connection.execute(query, [username]);
        
         if (rows.length === 0) {
           //throw new Error('User not found');
           return ({
             status: 'error',
             message: 'User not found'
           });
         }
    
         const user = rows[0];

         // Compares the provided password with the hash stored in the database
         const CorrespondingPassword = await bcrypt.compare(password, user.password);
        
         //const Correspondingpassword = username === 'super' && password === 'super' ? true : false;
    
         if (!CorrespondingPassword) {
           //throw new Error('Incorrect password');
           return ({
             status: 'error',
             message: 'Incorrect password'
           });
         } else {
             // Creates a JWT token with a payload containing the relevant user information
             const accessToken = jwt.sign({ iduser: user.iduser, username }, secretKey, { expiresIn: '1h' });

             // Generate refreshToken
             const refreshToken = jwt.sign({ iduser: user.iduser, username }, secretKey, { expiresIn: '1d' });

             //res.json({ accessToken, refreshToken });

             // Returns the token to the frontend
             console.log('Successfully authenticated user');
            
             return {accessToken, refreshToken};
         }
         /*else {
             res.status(401).json({ error: 'Invalid credentials' });
         }*/
    
         // The password is correct, the user can continue
        
       } catch (error) {
         console.error('Authentication error:', error);
       } finally {
         //connection.end(); // Close the database connection
       }
};

const verifyToken = (req) => {
   //const res = {};
   const token = req.headers['authorization'];
  
   try {
     if (!token) {
       /*return ({
         status: '401',
         message: 'Token not provided'
       });*/
       //console.log('I don't find token')
       return false; //res.status(401).json({ error: 'Token not provided.' });
     }
     jwt.verify(token, secretKey, (err, decoded) => {
       if (err) {
         return false; //res.status(401).json({ error: 'Invalid token.' });
       }

       // If the token is valid, you can add the decoded user (or relevant information) to the 'req' object for later use
       req.user = decoded;

     });
     //console.log()
     return req.user;
   } catch (error) {
     console.log(error);
   }
};

const refreshToken = async(req) => {
   const { refreshToken } = req.headers['authorization'];;

   if (!refreshToken) {
     throw new NotFoundException('User token not provided');
   }

   const iduser = jwt.decode(refreshToken)['iduser'];

   // Search the user by user id in the database
   const query = 'SELECT * FROM users WHERE iduser = ?';
   const [rows] = await connection.execute(query, [iduser]);

   if (rows.length === 0) {
     //throw new Error('User not found');
     return ({
       status: 'error',
       message: 'User not found'
     });
   }

   const user = rows[0];

   // Generate a new accessToken
   const newAccessToken = jwt.sign({ iduser: user.iduser }, secretKey, { expiresIn: '1h' });

   return { accessToken: newAccessToken };
};

module.exports = {
     authUser,
     verifyToken,
     refreshToken,
};
