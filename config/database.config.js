require("dotenv").config(); 
// const dotenv = require('dotenv')
// dotenv.config({path:__dirname+'/.env'});

module.exports = {
    url: process.env.DB_URL,
}

