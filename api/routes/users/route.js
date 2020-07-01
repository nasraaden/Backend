const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('./model');

const restricted = require('../../../auth/authenticate-middleware');

const {
  validateUserId,
  validateWorkoutData,
  validateWorkoutId,
} = require('../../../middleware/all-middleware.js');

// GET ALL USERS
router.get('/', restricted, (req, res) => {
  Users.findAll()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Error getting all users.',
      });
    });
});

// GET USER BY ID
router.get('/:uid', validateUserId, (req, res) => {
  const { uid } = req.params;
  Users.findById(uid)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// EDIT USER
router.put('/:uid', validateUserId, (req, res) => {
  const { uid } = req.params;
  const changes = req.body;

  Users.update(uid, changes)
    .then((changes) => {
      if (changes) {
        res.status(200).json({ message: 'User successfully updated' });
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// DELETE USER
router.delete('/:uid', validateUserId, (req, res) => {
  const { uid } = req.params;

  Users.remove(uid)
    .then((user) => {
      res.status(200).json({ message: 'User successfully deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err.message);
    });
});
// -------------------------------------------------------------------------
// WORKOUR ENDPOINTS

// GET ALL WORKOUTS BY USER
router.get('/:uid/workouts', validateUserId, (req, res) => {
  const { uid } = req.params;
  Users.findUserWorkouts(uid)
    .then((workouts) => {
      res.status(200).json(workouts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error getting all workouts.' });
    });
});

// GET SINGLE WORKOUT BY ID
router.get(
  '/:uid/workouts/:wid',
  validateUserId,
  validateWorkoutId,
  (req, res) => {
    const { wid } = req.params;
    Users.findUserWorkoutsById(wid)
      .then((workout) => {
        res.status(200).json(workout);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error getting single user workout.' });
      });
  }
);

// ADD WORKOUT
router.post(
  '/:uid/add-workout',
  validateUserId,
  validateWorkoutData,
  (req, res) => {
    const { uid } = req.params;
    let newWorkout = req.body;
    newWorkout = { ...newWorkout, user_id: uid };

    Users.addWorkout(newWorkout)
      .then((workout) => {
        res.status(201).json(workout);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err.message);
      });
  }
);
// EDIT WORKOUT
router.put(
  '/:uid/workouts/:wid',
  validateUserId,
  validateWorkoutId,
  (req, res) => {
    const { wid } = req.params;
    const changes = req.body;
    Users.updateWorkout(wid, changes)
      .then((changes) => {
        res.status(200).json(changes);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
);

// DELETE WORKOUT
router.delete(
  '/:uid/workouts/:wid',
  validateUserId,
  validateWorkoutId,
  (req, res) => {
    const { wid } = req.params;
    Users.removeWorkout(wid)
      .then((deleted) => {
        res.status(200).json(deleted);
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  }
);

module.exports = router;
