const config = require("../../../knexfile")
const knex = require("knex")

const connectionDB = knex(config.development)

module.exports = connectionDB