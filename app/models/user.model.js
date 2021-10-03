// import mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  },
  confirmPassword: {
    type: String,
    required: true
  }
});

userSchema.pre("save", async function (next) {
  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.confirmPassword = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// create model
const Userdb = mongoose.model("user", userSchema);

class UserModel {
    createDetails = (userDetails, saveUserData) => {
      const newUser = new Userdb(
        {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          password: userDetails.password,
          confirmPassword: userDetails.confirmPassword
        }
      );
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
}

module.exports = new UserModel();
