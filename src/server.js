require("express-async-errors")

const AppError = require("./utils/appError")
const migrationsRun = require("./database/sqlite/migrations")
const express = require("express") // express import
const Routes = require("./routes")
const uploadConfig = require("./config/uploads")
const cors = require("cors")

const app = express() // starting from express
app.use(cors())

app.use(express.json()) // informs express that we are going to use json
app.use(Routes)
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER ))

migrationsRun();

app.use((error, request, response, next) => {

  if(error instanceof AppError){
    response.status(error.statusCode).json({
      message: error.message,
      status: "Error User"
    })
  } 
  
  console.log(error)

  return response.status(500).json({
      message: "erro interno do servidor",
      status: "Error server"
    })  
})

const PORT = 3333 // port that will be used by the application
app.listen(PORT, () => console.log(`server is running successfully ${PORT} 🚀🚀🚀`));