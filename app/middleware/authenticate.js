const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (data) => {
  const dataForToken = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email
  };
  return jwt.sign({ dataForToken }, process.env.TOKEN_KEY);
};

exports.getEmailFromToken = (token, callback) => {
  console.log("inside auth");
  const data = jwt.verify(token, process.env.TOKEN_KEY);
  if (data) {
    return callback(null, data);
  } else {
    // eslint-disable-next-line node/no-callback-literal
    return callback("couldnt verify", null);
  }
};
