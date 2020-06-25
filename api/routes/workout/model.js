const db = require('../../../database/dbConfig');

module.exports = { findUserWorkoutsById };

function findUserWorkoutsById(wid) {
  return db('workouts as w')
    .select(
      'w.id',
      'u.id as user_id',
      'w.name',
      'w.region',
      'w.date',
      'w.weight',
      'w.reps'
    )
    .where('w.id', wid)
    .join('users as u', 'w.user_id', 'u.id');
}
