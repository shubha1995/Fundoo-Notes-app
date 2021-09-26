const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (data) => {
  const dataForToken = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email
  };
  return jwt.sign(dataForToken, process.env.TOKEN_KEY, { expiresIn: "1H" });
};
