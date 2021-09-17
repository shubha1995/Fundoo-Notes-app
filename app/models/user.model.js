//import mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create schema
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

userSchema.pre('save', async function (next) {
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

//create model
const Userdb = mongoose.model('user', userSchema);

class UserModel {
    createDetails = (userDetails, saveUserData) => {
        const newUser = new Userdb(
            {firstName: userDetails.firstName,
             lastName: userDetails.lastName, 
             email: userDetails.email, 
             password: userDetails.password, 
             confirmPassword: userDetails.confirmPassword}
        );
        newUser.save((error, data) => {
            if (error) {
                saveUserData(err, null);
            } else {
                saveUserData(null, data);
            }
        });
    }
    loginUser = (loginData, authenticateUser) => {
         Userdb.findOne({
            email: loginData.email
        }, (error, data) => {
            if (error) {
                return authenticateUser(error, null);
            } else {
                if (!data) {
                    return authenticateUser("Invalid User", null);
                } else {
                    console.log("inside model", data)
                    return authenticateUser(null, data);
                }
            }

        });

    };

}

module.exports = new UserModel();
