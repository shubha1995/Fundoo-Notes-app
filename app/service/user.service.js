const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authenticate");
const { logger } = require("../../logger/logger");

class UserService {
    registerUser = (userData, saveUserData) => {
      userModel.createDetails(userData, (err, data) => {
        if (err) {
          saveUserData(err, null);
        } else {
          saveUserData(null, data);
        }
      });
    };

    loginUser = (loginData, authenticateUser) => {
      // call model layer
      userModel.loginUser(loginData, (err, data) => {
        if (err) {
          logger.error("Error found in service");
          return authenticateUser(err, null);
        } else {
          const result = bcrypt.compareSync(loginData.password, data.password);
          if (result) {
            const token = auth.generateToken(data);
            logger.info("Valid Password");
            return authenticateUser(null, token);
          } else {
            logger.error("Password does not match");
            return authenticateUser("Password does not match", null);
          }
        };
      }

      );
    }
}

module.exports = new UserService();
