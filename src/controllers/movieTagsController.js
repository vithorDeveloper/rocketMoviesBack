const knex = require('../database/knex');

class movieTags{
  async index(request, response){
    const { user_id } = request.params;

    const tags = await knex("movieTags").where({user_id})

    return response.json(tags)
  }
}

module.exports = movieTags;