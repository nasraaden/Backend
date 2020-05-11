const Users = require('../api/routes/users/model');

module.exports = {
  validateUserData,
  validateUserId,
  validateWorkoutData,
  validateWorkoutId,
};

// VALIDATE LOGIN/REGISTER DATA
function validateUserData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Missing login/register data.' });
  } else if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: 'username and password are required',
    });
  } else {
    next();
  }
}

// VALIDATE USER ID
function validateUserId(req, res, next) {
  let { uid } = req.params;
  id = uid;
  Users.findBy({ id })
    .then((user) => {
      if (user.length > 0) {
        next();
      } else {
        console.log(user);
        res.status(404).json({
          message: 'The user with the specified ID does not exist.',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Error validating user ID.',
      });
    });
}

// VALIDATE WORKOUT INFO
function validateWorkoutData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Missing review data' });
  } else if (
    !req.body.name ||
    !req.body.region ||
    !req.body.reps ||
    !req.body.weight ||
    !req.body.date
  ) {
    res.status(400).json({
      message: 'Workout name, region, reps, weight, and date are required',
    });
  } else {
    next();
  }
}

// VALIDATE WORKOUT ID
function validateWorkoutId(req, res, next) {
  const { wid } = req.params;
  Users.findUserWorkoutsById(wid)
    .then((workout) => {
      if (workout) {
        next();
      } else {
        res.status(404).json({
          errorMessage: 'The workout with the specified ID does not exist',
        });
      }
    })
    .catch((erorr) => {
      res.status(500).json({
        errorMessage:
          'Could not validate workout information for the specified ID',
      });
    });
}
