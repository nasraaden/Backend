
exports.up = function (knex) {
    return knex.schema.createTable("workouts", tbl => {
        tbl.increments();
        tbl
        tbl.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl
        tbl.integer("reps")
        tbl.integer("weight")
        tbl.string("date", 8)
        tbl.string("region")

    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("workouts");
};
