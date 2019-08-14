// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    database: {
        mongoHost: process.env.MONGO_ADDR || 'DB_HOST',
        mongoPort: process.env.MONGO_PORT || '27017'
    }
};