//import express library
const express = require('express');
const bodyParser = require('body-parser');

//create app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Fundoo Notes App"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
