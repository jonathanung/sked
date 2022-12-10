const UserController = require("../controllers/user-controller")
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/user/current", authenticate, UserController.getCurrent)
    app.post("/api/user/register", UserController.register)
    app.post("/api/user/login", UserController.login)
    app.get("/api/user/logout", UserController.logout)
}