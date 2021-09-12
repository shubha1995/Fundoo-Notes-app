//import service
const userService = require('../service/user.service');

class UserDataController {
    create = (req, res) => {
        console.log("inside controller", req.body);
        try{
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            };
            userService.registerUser(userData, (error, data) => {
                if (error) {
                    return res.status(409).json({
                        success: false,
                        message: 'User allready exist'
                    });
                } else {
                    res.status(201).json({
                    success: true,
                    message: 'user successfully registered',
                    data: data
                });
            }
            });
        }catch (error) {
            return res.status (500).json({
                success: false,
                message: 'Server-Error',
                data: null,
            })  ;
         }
    }
}

module.exports = new UserDataController();