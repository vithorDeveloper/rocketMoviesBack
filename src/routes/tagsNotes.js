const {Router} = require("express")

const movieTags = require("../controllers/movieTagsController")

const movieTagsRoutes = new Router()
const movieTagsController = new movieTags()

movieTagsRoutes.get('/:user_id', movieTagsController.index)

module.exports = movieTagsRoutes