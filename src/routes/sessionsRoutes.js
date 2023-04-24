const {Router} = require("express")

const SessionsControllers = require("../controllers/sessionsControllers")

const sessionsRoutes = new Router()
const sessionsControllers = new SessionsControllers()

sessionsRoutes.post("/", sessionsControllers.create)

module.exports = sessionsRoutes