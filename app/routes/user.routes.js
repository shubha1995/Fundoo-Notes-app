/*
 * @description   : It is use to route the APIs
 * @file          : user.routes.js
 * @author        : Shubha Sankar Bhaumik [ssbhaumikdmr@gmail.com]
*/
const userController = require("../controllers/user.controller.js");
const auth = require("../middleware/authenticate");
const noteController = require("../controllers/note.controller");
const label = require("../controllers/label.controller");
const redis = require("../middleware/redis");

module.exports = (app) => {
  app.post("/register", userController.create);
  app.post("/login", userController.login);
  app.post("/forgotpassword", userController.forgotPassword);
  // reset user passwor
  app.post("/resetpassword", auth.verifyToken, userController.resetPassword);
  // notes creation api - POST request
  app.post("/createnotes", auth.verifyToken, noteController.createNote);
  app.get("/getnotes", auth.verifyToken, noteController.getNote);
  // get all notes api - GET request
  app.get("/getnotesid/:id", auth.verifyToken, redis.redis_NOteById, noteController.getNoteById);
  // update note by Id api - PUT request
  app.put("/updatenotes/:id", auth.verifyToken, noteController.updateNoteById);
  // delete note by Id api -  DELETE request
  app.delete("/deletenotes/:id", auth.verifyToken, noteController.deleteNoteById);

  // label creation api - POST request
  app.post("/createlabel", auth.verifyToken, label.createLabel);
  // get all labels api - GET request
  app.get("/getlabels", auth.verifyToken, label.getLabel);
  // get single label by ID api - GET request
  app.get("/getlabel/:id", auth.verifyToken, redis.redis_LabelById, label.labelGetById);
  // update single label by ID api - PUT request
  app.put("/updatelabel/:id", auth.verifyToken, label.updateLabel);
  // delete label by ID api - DELETE request
  app.delete("/deletelabel/:id", auth.verifyToken, label.deleteLabelById);

  // add label to note api - POST request
  app.post("/addlabel/:id", auth.verifyToken, noteController.addLabelById);
  // delete label from note api - DELETE request
  app.delete("/deleteLabelFromNote/:id", auth.verifyToken, noteController.deleteLabel);
};
