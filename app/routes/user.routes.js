//import controller
const userController = require("../controllers/user.controller.js");

module.exports = (app) => {
    app.post('/register', userController.create);
}