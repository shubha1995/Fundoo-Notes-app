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
    loginUser = async(loginData, authenticateUser) => { 
      //call model layer 
        userModel.loginUser(loginData, (err, data) => {
              if (err) {
                authenticateUser(err, null);
              }
              else {
                let compare = bcrypt.compareSync(loginData.password, data.password);
              if(compare) {
                const token = auth.generateToken(data);
                authenticateUser(null,{data,token});
              } else {
                authenticateUser('Password does not match', null);
              }
          };
          
        }
       
      );
    }
    
}

module.exports = new UserService();