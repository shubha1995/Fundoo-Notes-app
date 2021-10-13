const userController = require("../controllers/user.controller.js");
const auth = require("../middleware/authenticate");
const noteController = require("../controllers/note.controller");
const label = require("../controllers/label.controller");

module.exports = (app) => {
  app.post("/register", userController.create);
  app.post("/login", userController.login);
  app.post("/forgotpassword", userController.forgotPassword);
  app.post("/resetpassword", auth.verifyToken, userController.resetPassword);
  app.post("/createnotes", auth.verifyToken, noteController.createNote);
  app.get("/getnotes", auth.verifyToken, noteController.getNote);
  app.get("/getnotesid/:id", auth.verifyToken, noteController.getNoteById);
  app.put("/updatenotes/:id", auth.verifyToken, noteController.updateNoteById);
  app.delete("/deletenotes/:id", auth.verifyToken, noteController.deleteNoteById);

  app.post("/createlabel", auth.verifyToken, label.createLabel);
  app.get("/getlabels", auth.verifyToken, label.getLabel);
  app.get("/getlabel/:id", auth.verifyToken, label.getLabelById);
};
