exports.up = knex => knex.schema.createTable('notesMovies', table => {
  table.increments('id');
  table.text('movie_title');
  table.text('movie_description');
  table.integer('movie_for_the_note');
  table.integer('user_id').references('id').inTable('users');
  table.timestamp('creation_date').default(knex.fn.now());
  table.timestamp('edit_date').default(knex.fn.now());
});

exports.down = knex => knex.schemas.dropTable("notesMovies");