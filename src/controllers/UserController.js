const AppError = require("../utils/appError")
const sqlConnection = require("../database/sqlite")
const { hash, compare } = require("bcryptjs") 

class UserControllers{
  async create(request, response){
    const {name, email, password} = request.body

    const database =  await sqlConnection()
    const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUsersExists){
      throw new AppError("email existe")
    }

    const passwordHash = await hash(password, 4)

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    )

    return response.status(201).json()
  }

  async update(request, response){
    const {name, email, password, oldPassword} = request.body
    const user_id = request.user.id
    

    const database =  await sqlConnection()

    const User = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if(!User){
      throw new AppError("usuario no encontrado")
    }

    const emailUpdate = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(emailUpdate && emailUpdate.id !== User.id){
      throw new AppError("Este e-mail já está em uso.")
    }

    User.name = name ?? User.name
    User.email = email ?? User.email

    if(!oldPassword){
      throw new  AppError("informe a senha atual")
    }

    if (password && oldPassword){
      const checkOldPassword = await compare(oldPassword, User.password)

      if(!checkOldPassword){
        throw new AppError("a senha não confere")
      }

      User.password = await hash(password, 4)
    }

    await database.run(
    `UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME("now")
      WHERE id = ?`,
      [User.name, User.email, User.password, user_id]
    )

    return response.status(201).json()
  }
}

module.exports = UserControllers