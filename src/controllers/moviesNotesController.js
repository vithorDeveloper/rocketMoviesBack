const knex = require('../database/knex');

class moviesNotesController{
  async create(request, response){

    const { movie_title, movie_description, movie_for_the_note, movieTags } = request.body
    const user_id = request.user.id

    const note_id = await knex("notesMovies").insert({
        movie_title,
        movie_description,
        movie_for_the_note,
        user_id
    })
    
    const moviesTags = movieTags.map(name =>{
      return{
        note_id,
        name,
        user_id
      }
    })

    await knex("movieTags").insert(moviesTags)

    return response.json()
  }

  async show(request, response){
    const { id } = request.params

    const notesMovies = await knex("notesMovies").where({id}).first()
    const moviesTags = await knex("movieTags").where({id}).orderBy('name')

    return response.json({
      ...notesMovies,
        moviesTags,
    }
    )
  }
  
  async delete(request, response){
    const { id } = request.params

    await knex("notesMovies").where({id}).delete()

    return response.json()
  }

  async index(request, response){
    const { movie_title, movieTags } = request.query
    const user_id = request.user.id

    let notes_movies;

    if(movieTags){
      const filtered = movieTags.split(",").map(movieTag => movieTag.trim())//

      notes_movies = await knex("movieTags")
      .select([
        "notesMovies.id", 
        "notesMovies.movie_title",
        "notesMovies.user_id"
      ])
      .where("notesMovies.user_id", user_id)
      .whereLike("notesMovies.movie_title", `%${movie_title}%`)  //
      .whereIn("name", filtered)
      .innerJoin("notesMovies", "notesMovies.id", "movieTags.note_id").orderBy("notesMovies.movie_title")
    }
    else{
      notes_movies = await knex("notesMovies").where({user_id})
      .whereLike("movie_title", `%${movie_title}%`)
      .orderBy('movie_title')
    }

      const usersTags = await knex("movieTags").where({user_id}) //
        const notesAndTags = notes_movies.map(notes_movies => {
          const tagsUser = usersTags.filter(tag => tag.note_id === notes_movies.id)

        return {
          ...notes_movies,
          movieTags: tagsUser
        }
      })

      return response.json(notesAndTags)
  }
}

module.exports = moviesNotesController