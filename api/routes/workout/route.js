const router = require('express').Router();

const { validateWorkoutId } = require('../../../middleware/all-middleware');

const Workouts = require('./model');

router.get('/:wid', validateWorkoutId, (req, res) => {
  const { wid } = req.params;
  Workouts.findUserWorkoutsById(wid)
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error getting single user workout.' });
    });
});

module.exports = router;
