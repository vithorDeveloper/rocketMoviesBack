const {Router} = require("express")

const userControllers = require("../controllers/UserController")

const userRoutes = new Router()
const UserControllers = new userControllers()

userRoutes.post("/", UserControllers.create)
userRoutes.put("/:id", UserControllers.update)

module.exports = userRoutes