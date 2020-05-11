exports.up = function (knex) {
  return knex.schema.createTable('workouts', (tbl) => {
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('name', 128);
    tbl.string('region', 128);
    tbl.integer('reps');
    tbl.integer('weight');
    tbl.string('date', 9);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('workouts');
};
