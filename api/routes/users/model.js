const db = require('../../../database/dbConfig.js');

module.exports = {
  findAll,
  findById,
  add,
  findBy,
  update,
  remove,
  findUserWorkouts,
  findUserWorkoutsBy,
  findUserWorkoutsById,
  addWorkout,
  updateWorkout,
  removeWorkout,
};
// FIND ALL USERS
function findAll() {
  return db('users');
}

// FIND USER BY FILTER
function findBy(filter) {
  return db('users').where(filter);
}

// FIND USER BY ID
function findById(uid) {
  return db('users as u')
    .where('id', uid)
    .select('u.id', 'u.username')
    .first()
    .then((user) => {
      return findUserWorkouts(user.id).then((workouts) => {
        return {
          ...user,
          workouts: workouts,
        };
      });
    });
}

// ADD A USER
function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => {
      return findById(id);
    });
}

// EDIT A USER
function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

// DELETE A USER
function remove(id) {
  return db('users').where({ id }).del();
}

// FIND ALL USER WORKOUTS
function findUserWorkouts(uid) {
  return db('workouts as w')
    .select(
      'w.id',
      'u.id as user_id',
      'w.name',
      'w.region',
      'w.date',
      'w.weight',
      'w.reps',
      'w.description'
    )
    .where('w.user_id', uid)
    .join('users as u', 'w.user_id', 'u.id');
}

// FIND USER BY FILTER
function findUserWorkoutsBy(filter) {
  return db('workouts').where(filter);
}

// FIND USER WORKOUT BY ID
function findUserWorkoutsById(wid) {
  return db('workouts as w')
    .select(
      'w.id',
      'u.id as user_id',
      'w.name',
      'w.region',
      'w.date',
      'w.weight',
      'w.reps',
      'w.description'
    )
    .join('users as u', 'w.user_id', 'u.id')
    .where('w.id', wid);
}

// ADD USER WORKOUT
function addWorkout(workout) {
  return db('workouts')
    .insert(workout, 'id')
    .then(([id]) => {
      return findUserWorkoutsById(id);
    });
}

// EDIT USER WORKOUTS
function updateWorkout(id, changes) {
  return db('workouts')
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findUserWorkoutsById(id);
      } else {
        return null;
      }
    });
}

// DELETE USER WORKOUTS
function removeWorkout(id) {
  return db('workouts').where({ id }).first().del();
}
