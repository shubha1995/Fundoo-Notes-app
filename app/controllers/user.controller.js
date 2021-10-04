const userService = require("../service/user.service");
const { authUserRegister, authUserLogin, authUserforgot } = require("../middleware/validation");
const { logger } = require("../../logger/logger");

class UserDataController {
    create = (req, res) => {
      try {
        const userData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword
        };

        const registerValidation = authUserRegister.validate(userData);
        if (registerValidation.error) {
          res.status(400).send({
            success: false,
            message: "Enter valid fields",
            data: registerValidation
          });
          logger.error("Invalid details");
          return;
        }

        userService.registerUser(userData, (error, data) => {
          if (error) {
            return res.status(409).json({
              success: false,
              message: "User allready exist"
            });
          } else {
            logger.info("User registered");
            res.status(201).json({
              success: true,
              message: "user successfully registered",
              data: data
            });
          }
        });
      } catch (error) {
        logger.error("Internal server error");
        return res.status(500).json({
          success: false,
          message: "Server-Error",
          data: null
        });
      }
    }

    login = (req, res) => {
      try {
        const loginData = {
          email: req.body.email,
          password: req.body.password
        };

        const loginValidation = authUserLogin.validate(loginData);
        if (loginValidation.error) {
          res.status(400).send({
            success: false,
            message: "check inserted fields",
            data: loginValidation
          });
          return;
        }

        userService.loginUser(loginData, (error, data) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: "login failed",
              error
            });
          }
          return res.status(200).send({
            success: true,
            message: "logged in successfull",
            token: data
          });
        });
      } catch (err) {
        return res.status(500).send({
          success: false,
          message: "server error"
        });
      }
    }

    forgotPassword = (req, res) => {
      try {
        const user = {
          email: req.body.email
        };
        const emailValidation = authUserforgot.validate(user);
        if (emailValidation.error) {
          res.status(400).send({
            success: false,
            message: "check inserted fields",
            data: emailValidation
          });
          return;
        }
        userService.forgotPassword(user, (error, data) => {
          if (error) {
            logger.error("email id is not exist");
            return res.status(409).json({
              success: false,
              message: "email id is not exist"
            });
          } else {
            logger.info("email send Successfully");
            res.status(201).json({
              success: true,
              data: data,
              message: "email send successfully"
            });
          }
        });
      } catch (error) {
        logger.error("server-error");
        return res.status(500).json({
          success: false,
          data: null,
          message: "server-error"
        });
      }
    };
}
module.exports = new UserDataController();
