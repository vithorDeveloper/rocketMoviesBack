const {Router} = require("express")
const multer = require("multer")
const uploadConfig = require("../config/uploads")

const userControllers = require("../controllers/UserController")
const userAvatarController = require("../controllers/userAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userRoutes = new Router()
const upload = multer(uploadConfig.MULTER)

const UserControllers = new userControllers()
const UserAvatarController = new userAvatarController()


userRoutes.put("/", ensureAuthenticated, UserControllers.update)
userRoutes.post("/", UserControllers.create)
userRoutes.patch ("/avatar", ensureAuthenticated,  upload.single("avatar"), UserAvatarController.update)

module.exports = userRoutes           