//import mongoose
const mongoose = require('mongoose');

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

//create model 
const Userdb = mongoose.model('user', userSchema);


class UserModel {
    createDetails = (userDetails, saveUserData) => {
        console.log("inside model", userDetails);
        const newUser = new Userdb({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
            confirmPassword: userDetails.confirmPassword,
        });
        newUser.save((error, data) => {
            if (error) {
                saveUserData(err, null);
            } else {
                saveUserData(null, data);
            }
        });
    }
    loginUser = (loginData, authenticateUser) => {
        console.log('inside model', loginData);
              Userdb.findOne({ email: loginData.email ,password: loginData.password}, (error, data) => {
                if (error) {
                  return authenticateUser(error, null);
                }
                else{  
                  if (!data) {
                  return authenticateUser("Invalid User", null);
                }
                  else{
                    return authenticateUser(null, data);
                  }
              }
              
              });
           
        };


}

module.exports = new UserModel();



