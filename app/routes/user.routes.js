const userController = require("../controllers/user.controller.js");
const auth = require("../middleware/authenticate");
const noteController = require("../controllers/note.controller");

module.exports = (app) => {
  app.post("/register", userController.create);
  app.post("/login", userController.login);
  app.post("/forgotpassword", userController.forgotPassword);
  app.post("/resetpassword", auth.verifyToken, userController.resetPassword);
  app.post("/createnotes", auth.verifyToken, noteController.createNote);
};
