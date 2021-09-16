const userModel = require('../models/user.model.js')
const bcrypt = require("bcrypt");
const auth = require('../middleware/authenticate');

class UserService {
    registerUser = (userData, saveUserData) => {
        userModel.createDetails(userData, (err,data)=>{
            if (err){
                saveUserData(err, null);
            }else {
                saveUserData(err, data);
            }
        });
    };
    loginUser = (loginData, authenticateUser) => {  
        userModel.loginUser(loginData, (err, data) => {
          if (data) {
            bcrypt.compare(loginData.password, data.password, (err,data)=>{
              if (err) {
                authenticateUser(err, null);
              }
              if(data) {
                const token = auth.generateToken(data);
                authenticateUser(null, token);
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