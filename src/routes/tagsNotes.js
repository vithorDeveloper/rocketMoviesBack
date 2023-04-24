const {Router} = require("express")

const movieTags = require("../controllers/movieTagsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const movieTagsRoutes = new Router()
const movieTagsController = new movieTags()

movieTagsRoutes.get('/', ensureAuthenticated, movieTagsController.index)

module.exports = movieTagsRoutes