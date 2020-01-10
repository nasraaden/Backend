const router = require("express").Router();

const Workout = require("./model")
const restricted = require("../../../auth/authenticate-middleware")



/**
 * @api {post} /api/workouts
 * @apiName CreateWorkout
 * @apiGroup Workouts
 * @apiParam {Integer} user_id cannot be null and must match the current users id
 * @apiParam {String{...128}} name Cannot be null
 * @apiParam {String{...128}} region Cannot be null
 * @apiParam {String{...9}} date should be in this format 1/8/2020
 * @apiParam {Integer} weight this Can be null
 * @apiParam {Integer} reps this Cannot be null
 *
 * @apiSuccessExample {json} Success-Response-Example:
 * HTTP/1.1 201 Created
 *  {
 * "id": 1,
 * "user_id": 1,
 * "reps": 20,
 * "weight": 50,
 * "date": "1/6/2020",
 * "region": "biceps",
 * "name": "curls"
* }
 */


router.post("/workouts", (req, res) => {
    const newWorkout = req.body;

    if (!newWorkout.name) {
        res.status(400).json({ message: "Please provide a name for this workout" })
    } else {
        Workout.add(newWorkout)
            .then(workout => {
                res.status(201).json(workout);
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
})
/**
 * @api {get} /workouts
 * @apiName GetAllWorkouts
 * @apiGroup Workouts
 * @apiSuccessExample {json} Success-Response-Example:
 * HTTP/1.1 200 OK
 * [
 * {
 *  "id": 1,
 *  "user_id": 1,
 *  "name": "benchpress",
 *  "region": "chest",
 *  "date": "1/8/2020",
 *  "weight": 245,
 *  "reps": 15
 *  },
 * {
  *  "id": 2,
  *  "user_id": 1,
  *  "name": "squats",
  *  "region": "legs",
  *  "date": "1/8/2020",
  *  "weight": 400,
  *  "reps": 15
 *  },
 * {
 *  "id": 3,
 *  "user_id": 1,
 *  "name": "latpulldown",
 *  "region": "lats",
 *  "date": "1/8/2020",
 *  "weight": 215,
 *  "reps": 15
 *  }
 * ]
 */

router.get("/workouts", restricted, (req, res) => {
    Workout.findAll("workouts")
        .select('id', 'user_id')
        .then(workouts => {
            res.status(200).json(workouts);
        })
        .catch(err => {
            res.send(err)
        })

})

/**
 * @api {get} /workouts/:id
 * @apiName GetWorkoutByWorkoutID
 * @apiGroup Workouts
 * @apiSuccessExample {json} Success-Response-Example:
 * HTTP/1.1 200 OK
 * {
 * "id": 1,
 * "user_id": 1,
 * "reps": 100,
 * "weight": 50,
 * "date": "1/6/2020",
 * "region": "biceps",
 * "name": "curls"
 * }
 */

router.get("/workouts/:id", (req, res) => {
    const id = req.params.id;
    Workout.findById(id)
        .then(workout => {
            if (workout) {
                res.status(200).json(workout);
            } else {
                res.status(404).json({ message: "The specified workout cannot be found" })
            }

        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

/**
 * @api {get} /users/:id/workouts
 * @apiName GetWorkoutsByUserId
 * @apiGroup Workouts
 *
 * @apiSuccessExample {json} Success-Response-Example:
 * HTTP/1.1 200 OK
 * [
 * {
 *  "username": "admin1",
 * "id": 1,
 *"name": "curls",
 *"region": "biceps",
 *"date": "1/6/2020",
 *"weight": 50,
 *"reps": 20
 *}
 *]
 */


router.get("/users/:id/workouts", async (req, res) => {
    try {
        const workouts = await Workout.findByUserId(req.params.id);
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

/**
 * @api {put} /workouts/:id
 * @apiName UpdateWorkout
 * @apiGroup Workouts
 *
 * @apiSuccessExample {json} Success-Response-Example:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Workout successfully updated"
 *}
 */

router.put("/workouts/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Workout.update(id, changes)
        .then(changes => {
            if (changes) {
                res.status(200).json({ message: "Workout successfully updated" })
            } else {
                res.status(404).json({ message: "The specified workout does cannot be found" })
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})
/**
 * @api {del} /workouts/:id
 * @apiName DeleteWorkout
 * @apiGroup Workouts
 * @apiSuccessExample {json} Success-Response-Example:
 * HTTP/1.1 200 OK
 * {
 * "message": "Workout successfully deleted"
 * }
 */

router.delete("/workouts/:id", (req, res) => {
    const id = req.params.id;
    Workout.remove(id)
        .then(count => {
            res.status(204).json({ message: "Workout successfully deleted" })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

module.exports = router;