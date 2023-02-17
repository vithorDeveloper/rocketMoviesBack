const {Router} = require('express')

const moviesNotes = require('../controllers/moviesNotesController')

const moviesNotesRoutes = new Router()
const moviesNotesController = new moviesNotes()

moviesNotesRoutes.post('/:user_id', moviesNotesController.create)
moviesNotesRoutes.get('/', moviesNotesController.index)
moviesNotesRoutes.get('/:id', moviesNotesController.show)
moviesNotesRoutes.delete('/:id', moviesNotesController.delete)

module.exports = moviesNotesRoutes