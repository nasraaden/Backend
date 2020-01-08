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

module.exports = router;