const sqlConnection = require("../../sqlite")
const createUsers = require("../migrations/createUsers")

  async function migrationsRun(){
    const schemas = [
      createUsers
    ].join("")

    sqlConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log(error))

    return migrationsRun
  }

  module.exports = migrationsRun