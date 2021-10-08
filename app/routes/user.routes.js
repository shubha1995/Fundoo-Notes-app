const userController = require("../controllers/user.controller.js");
const auth = require("../middleware/authenticate");

module.exports = (app) => {
  app.post("/register", userController.create);
  app.post("/login", userController.login);
  app.post("/forgotpassword", userController.forgotPassword);
  app.post("/resetpassword", auth.verifyToken, userController.resetPassword);
};
