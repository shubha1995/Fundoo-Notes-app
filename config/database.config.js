require("dotenv").config();
const mongoose = require("mongoose");

exports.dbConnection = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
  }).then(() => {
    console.log("SucceSssfully connected to the database");
  }).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
};
