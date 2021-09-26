const express = require("express");
require("dotenv").config();
const dbConfig = require("./config/database.config.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

// create app
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
dbConfig.dbConnection();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Fundoo Notes App" });
});

// Require Notes routes
require("./app/routes/user.routes.js")(app);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port" + " " + process.env.PORT);
});

module.exports = app;
