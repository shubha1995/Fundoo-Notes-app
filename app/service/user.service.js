const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authenticate");
const { logger } = require("../../logger/logger");
const mailUser = require("../middleware/nodemailer");

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
      });
    }

    forgotPassword = (user, callback) => {
      userModel.forgotPassword(user, (err, data) => {
        if (err || !data) {
          return callback(err, null);
        } else {
          return callback(null, mailUser.sendEmail(data));
        }
      });
    };

    resetPassword = (userData, callback) => {
      auth.getEmailFromToken(userData.token, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          const inputData = {
            email: data.dataForToken.email,
            password: userData.password
          };
          userModel.resetPassword(inputData, (error, data) => {
            if (error) {
              logger.error(error);
              return callback(error, null);
            } else {
              return callback(null, data);
            }
          });
        }
      });
    }
}

module.exports = new UserService();
