
exports.up = function (knex) {
    return knex.schema.createTable("workout_exercise", tbl => {
        tbl.increments();
        tbl
            .integer("excerside_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("exercise")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl
            .integer("workout_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("workout")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("workout_excercise")
};
