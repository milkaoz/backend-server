// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    database: {
        mongoHost: process.env.MONGO_ADDR || 'localhost',
        mongoPort: process.env.MONGO_PORT || '27017'
    }
};