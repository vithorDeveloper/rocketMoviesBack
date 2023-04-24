const {Router} = require('express')

const moviesNotes = require('../controllers/moviesNotesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const moviesNotesRoutes = new Router()
const moviesNotesController = new moviesNotes()

moviesNotesRoutes.use(ensureAuthenticated)

moviesNotesRoutes.post('/', moviesNotesController.create)
moviesNotesRoutes.get('/', moviesNotesController.index)
moviesNotesRoutes.get('/:id', moviesNotesController.show)
moviesNotesRoutes.delete('/:id', moviesNotesController.delete)

module.exports = moviesNotesRoutes