require("express-async-errors")

const AppError = require("./utils/appError")
const migrationsRun = require("./database/sqlite/migrations")
const express = require("express") // express import
const Routes = require("./routes")

const app = express() // starting from express
app.use(express.json()) // informs express that we are going to use json
app.use(Routes)

migrationsRun();

app.use((error, request, response, next) => {

  if(error instanceof AppError){
    response.status(error.statusCode).json({
      message: error.message,
      status: "Error User"
    })
  } else{
    response.status(500).json({
      message: "erro interno do servidor",
      status: "Error server"
    })   
  }
})

const PORT = 3333 // port that will be used by the application
app.listen(PORT, () => console.log(`server is running successfully ${PORT} 🚀🚀🚀`));