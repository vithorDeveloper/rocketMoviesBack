const knex = require('../database/knex');
const AppError = require('../utils/appError')
const authConfig = require('../config/auth')
const { sign } = require('jsonwebtoken')
const { compare } = require('bcryptjs')

class SessionsControllers {
  async create(request, response){
    const {email, password} = request.body

    const user = await knex("users").where({email}).first()

    if (!user){
      throw new AppError("Email e/ou senha incorretos")
    }

    const passwords = await compare(password, user.password)

    if(!passwords){
      throw new AppError("Email e/ou senha incorretos")
    }

    const {secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, 
        {
          subject: String(user.id),
          expiresIn
        })

      return response.json({user, token})
  }
}

module.exports = SessionsControllers