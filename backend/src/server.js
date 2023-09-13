const app = require('./app');

require('dotenv').config();

// Start the application with the environment port or if it fails, start with 3333
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
