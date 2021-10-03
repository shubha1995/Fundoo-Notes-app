const userController = require("../controllers/user.controller.js");

module.exports = (app) => {
  app.post("/register", userController.create);
  app.post("/login", userController.login);
  app.put("/forgotpassword", userController.forgotPassword);
};
