
exports.up = function (knex) {
    return knex.schema.createTable("excersie", tbl => {
        tbl.increments();
        tbl
            .string("workout_name", 128)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("excersie");
};
