const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

/*const verifyToken = (req, res, next) => {
  
   const token = req.headers['authorization'];

   if (!token) {
     return res.status(401).json({ error: 'Token not provided.' });
   }

   jwt.verify(token, secretKey, (err, decoded) => {
     if (err) {
       return res.status(401).json({ error: 'Invalid token.' });
     }

     // If the token is valid, you can add the decoded user (or relevant information) to the 'req' object for later use
    
     req.user = decoded;

     // Call the next middleware or route controller if the token is valid
     next();
   });
};*/

const authenticateToken = (req, res, next) => {
   const token = req.headers.authorization;

   if (!token) {
     return res.status(401).json({ error: 'Token not provided' });
   }

   try {
     const decoded = jwt.verify(token, secretKey);
     req.userId = decoded.userId; // Add the user ID to the request object
     next(); // Continue to the next function
   } catch (error) {
     return res.status(401).json({ error: 'Invalid token' });
   }
};

module.exports = {
   authenticateToken,
};
