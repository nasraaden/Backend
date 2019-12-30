
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .string('username', 255)
            .notNullable()
            .unique();
        users.string('password', 255).notNullable();
    })
        .createTable('workout', workout => {
            workout.increments();

            workout
                .integer('reps', 2).notNullable()
            workout.integer('weight', 3)
            workout.string('date', 255).notNullable()
            workout.integer('review', 1).notNullable()
        })
        .createTable('exercise', exercise => {
            exercise.increments();
            exercise
                .string('workout_name', 255)
        })
        .createTable('region', region => {
            region.increments();

            region
                .string('region', 255)
        })
        .createTable('users_workout', users_workout => {
            users_workout.increments();

            users_workout
                .integer('users_id').references('id').inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')

            users_workout
                .integer('workout_id').references('id').inTable('workout')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')

        })
        .createTable('workout_exercise', workout_exercise => {
            workout_exercise
                .integer('body_region_id').references('id').inTable('region')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')

            workout_exercise
                .integer('exercise_id').references('id').inTable('exercise')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')

            workout_exercise
                .integer('workout_id').references('id').inTable('workout')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('workout_exercise')
        .dropTableIfExists('users_workout')
        .dropTableIfExists('region')
        .dropTableIfExists('exercise')
        .dropTableIfExists('workout')
        .dropTableIfExists('users')

};
