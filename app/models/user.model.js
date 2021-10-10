const mongoose = require("mongoose");
const auth = require("../middleware/authenticate");
const { logger } = require("../../logger/logger");

// create schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Save the database in a constant so that we can access it
const Userdb = mongoose.model("user", userSchema);

class UserModel {
  /**
     * @description: Adds data to the database
     * @param {*} newUser
     * @param {*} callback
     */
    createDetails = (userDetails, saveUserData) => {
      const newUser = new Userdb(
        {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          password: userDetails.password
        }
      );
      auth.hashing(newUser.password, (err, hashpassword) => {
        if (err) {
          throw err;
        } else {
          newUser.password = hashpassword;
          newUser.save((error, data) => {
            if (error) {
              logger.error("Find error in model");
              saveUserData(error, null);
            } else {
              logger.info("User suucesfully registered");
              saveUserData(null, data);
            }
          });
        }
      });
    };

    /**
     * @description: Authenticates user information from the database
     * @param {*} credentials
     * @param {*} callback
     */
    loginUser = (loginData, authenticateUser) => {
      Userdb.findOne({ email: loginData.email }, (error, data) => {
        if (error) {
          logger.error("Find error while loggin user");
          return authenticateUser(error, null);
        } else {
          if (!data) {
            logger.error("Invalid User");
            return authenticateUser("Invalid User", null);
          } else {
            logger.info("Email id found");
            return authenticateUser(null, data);
          }
        }
      });
    };

    /**
     * @description:checks if emailId is present inside database
     * @param {*} email
     * @param {*} callback
     */
    forgotPassword = (userDetails, callback) => {
      try {
        Userdb.findOne({ email: userDetails.email }, (err, data) => {
          if (err || !data) {
            // eslint-disable-next-line node/no-callback-literal
            return callback(err + "invalid email", null);
          } else {
            return callback(null, data);
          }
        });
      } catch (error) {
        logger.error("Internal Error");
        // eslint-disable-next-line node/no-callback-literal
        return callback("Internal Error", null);
      }
    };

    /**
     * @description:looks for data by id and updates password
     * @param {*} credentials
     * @param {*} callback
     */
    resetPassword = (resetInfo, callback) => {
      // Hashed Password
      auth.hashing(resetInfo.newPassword, (err, hashedPassword) => {
        if (err) {
          throw err;
        } else {
          Userdb.findByIdAndUpdate(resetInfo.id, { password: hashedPassword }, (error, data) => {
            if (data) {
              logger.info("Password Updated successfully");
              return callback(null, data);
            } else {
              logger.info(error);
              return callback(error, null);
            }
          });
        }
      });
    }
}
module.exports = new UserModel();
