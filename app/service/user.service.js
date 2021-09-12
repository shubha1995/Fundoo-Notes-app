//import model 
const userModel = require('../models/user.model.js')
//import bcrypt
const bcrypt = require("bcrypt");

class UserService {
    registerUser = (userData, saveUserData) => {
        console.log("inside service", userData);
        userModel.createDetails(userData, (err,data)=>{
            if (err){
                saveUserData(err, null);
            }else {
                saveUserData(err, data);
            }
        });
    };
    loginUser = (loginData, authenticateUser) => {  
      console.log("inside service", loginData);
        userModel.loginUser(loginData, (err, data) => {
          if (data) {
            bcrypt.compare(loginData.password, data.password, (err,data)=>{
              if (err) {
                authenticateUser(err, null);
              }
              if(data) {
                authenticateUser(null, data);
              } else {
                authenticateUser('Password does not match');
              }
          });
        }else{
          authenticateUser("user not found");
        }
      });
    }
    
}

module.exports = new UserService();