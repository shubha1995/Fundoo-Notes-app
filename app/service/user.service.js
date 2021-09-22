const userModel = require('../models/user.model.js')
const bcrypt = require("bcrypt");
const auth = require('../middleware/authenticate');

class UserService {
    registerUser = (userData, saveUserData) => {
        userModel.createDetails(userData, (err,data)=>{
            if (err){
                saveUserData(err, null);
            }else {
                saveUserData(null, data);
            }
        });
    };
    loginUser = (loginData, authenticateUser) => { 
      //call model layer 
        userModel.loginUser(loginData, (err, data) => {
              if (err) {
                return authenticateUser(err, null);
              }
              else {
                let result = bcrypt.compareSync(loginData.password, data.password);
              if(result) {
                const token = auth.generateToken(data);
                return authenticateUser(null,token);
              } else {
                return authenticateUser('Password does not match', null);
              }
          };
          
        }
       
      );
    }
    
}

module.exports = new UserService();