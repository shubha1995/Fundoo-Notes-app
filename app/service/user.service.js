/* eslint-disable no-undef */
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authenticate");
const { logger } = require("../../logger/logger");
const mailUser = require("../middleware/nodemailer");

class UserService {
  /**
     * @description: Function sends new user info to model
     * @param {*} newUser
     * @param {*} callback
     */
    registerUser = (userData, saveUserData) => {
      userModel.createDetails(userData, (err, data) => {
        if (err) {
          saveUserData(err, null);
        } else {
          saveUserData(null, data);
        }
      });
    };

    /**
     * @description: Function gets data from model, whether it is valid or not.
     * @param {*} credentials
     * @param {*} callback
     */
    loginUser = (loginData, authenticateUser) => {
      // call model layer
      userModel.loginUser(loginData, (err, data) => {
        if (err) {
          logger.error("Error found in service");
          return authenticateUser(err, null);
        } else {
          const result = bcrypt.compareSync(loginData.password, data.password);
          if (result) {
            const token = auth.jwtTokenGenerate(data);
            logger.info("Valid Password");
            return authenticateUser(null, token);
          } else {
            logger.error("Password does not match");
            return authenticateUser("Password does not match", null);
          }
        };
      });
    }

    /**
     * @description:calls nodemailer if emailid exists in database
     * @param {*} email
     * @param {*} callback
     */
    forgotPassword = (user, callback) => {
      userModel.forgotPassword(user, (err, data) => {
        if (err || !data) {
          return callback(err, null);
        } else {
          return callback(null, mailUser.sendEmail(data));
        }
      });
    };

    /**
     * @description:verifies token, if valid sends new password to model layer
     * @param {*} req
     * @param {*} callback
     */
     resetPassword = (resetInfo, callback) => {
       userModel.resetPassword(resetInfo, (error, data) => {
         if (data) {
           return callback(null, data);
         } else {
           return callback(error, null);
         }
       });
     };
}

module.exports = new UserService();
