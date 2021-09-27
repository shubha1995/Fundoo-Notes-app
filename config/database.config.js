require("dotenv").config();
const mongoose = require("mongoose");
const { logger } = require("../logger/logger");

exports.dbConnection = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
  }).then(() => {
    logger.info("SucceSssfully connected to the database");
    console.log("SucceSssfully connected to the database");
  }).catch(err => {
    logger.error(`Could not connect to the database. Exiting now... ${err}`);
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
};
