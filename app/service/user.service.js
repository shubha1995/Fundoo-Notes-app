//import model
const userModel = require('../models/user.model.js')

class UserService {
    registerUser = (userData, saveUserData) => {
        console.log("inside service", userData);
        userModel.createDetails(userData, (err, data) => {
            if (err) {
                saveUserData(err, null);
            } else {
                saveUserData(err, data);
            }
        });
    };
    loginUser = (loginData, authenticateUser) => {
        console.log("inside service", loginData);
        userModel.loginUser(loginData, (err, data) => {
            if (err) {
                authenticateUser(err, null);
            } else {
                authenticateUser(null, data);
            }
        });
    };

}

module.exports = new UserService();