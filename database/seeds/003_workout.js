
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('workouts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('workouts').insert([
        { user_id: 1, name: 'benchpress', region: "chest", date: "1/8/2020", weight: 245, reps: 15 },
        { user_id: 1, name: 'squats', region: "legs", date: "1/8/2020", weight: 400, reps: 15 },
        { user_id: 1, name: 'latpulldown', region: "lats", date: "1/8/2020", weight: 215, reps: 15 }
      ]);
    });
};
