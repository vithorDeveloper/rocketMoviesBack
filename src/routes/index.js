const { Router } = require("express") // for the app to be visible here

const userRouter = require("./userRoutes")
const sessionsRouter = require("./sessionsRoutes")
const moviesNotesRouter = require("./moviesNotes")
const moviesTagsRouter = require("./tagsNotes")

const Routes = new Router()

Routes.use("/users", userRouter)
Routes.use("/sessions", sessionsRouter)
Routes.use("/notesMovies", moviesNotesRouter)
Routes.use("/movieTags", moviesTagsRouter)

module.exports = Routes