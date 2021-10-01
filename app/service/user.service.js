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

    forgotPassword = (email, callback) => {
      userModel.forgotPassword(email, (err, data) => {
        if (err || !data) {
          return callback(err, null);
        } else {
          mailUser.sendEmail(data, (err, res) => {
            if (err) {
              // eslint-disable-next-line node/no-callback-literal
              return callback("Error occured while sending reset link", null);
            } else {
              logger.info("Reset link sent succesfully");
              // eslint-disable-next-line no-unused-vars
              const link = {
                id: data._id,
                link: res.link
              };
              return callback(null, "Link sent");
            }
          });
        }
      });
    }
}

module.exports = new UserService();
