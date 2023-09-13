const crypto = require('crypto');

// Generate a 64-byte (512-bit) random secret key
const secretkey = crypto.randomBytes(64).toString('hex');
console.log('SecretKey:', SecretKey);

