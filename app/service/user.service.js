//import model 
const userModel = require('../models/user.model.js')

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
    
}

module.exports = new UserService();