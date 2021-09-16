const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

// import database module 
const dbConfig = require('./config/database.config.js')


//create app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Fundoo Notes App"});
});

// Require Notes routes
require('./app/routes/user.routes.js')(app)

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port" +" "+ process.env.PORT);
});

module.exports = app;