const db = require("../../../database/dbConfig")

module.exports = {
    add,
    findAll,
    findById,
    findByUserId,
    update,
    remove
}

function findAll() {
    return db("workouts")
        .select(
            "id",
            "user_id",
            "name",
            "region",
            "date",
            "weight",
            "reps"
        );

}


async function add(workout) {
    const [id] = await db("workouts").insert(workout);

    return findById(id);
}


function findById(id) {
    return db("workouts")
        .where({ id })
        .first();
}


function findByUserId(userId) {
    return db("workouts as w")
        .join("users as u", "u.id", "w.user_id")
        .select(
            "u.username",
            "w.id",
            "w.name",
            "w.region",
            "w.date",
            "w.weight",
            "w.reps"
        )
        .where("w.user_id", userId);
}

function update(id, changes) {
    return db("workouts")
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                return findById(id);
            } else {
                return null;
            }
        });
}

function remove(id) {
    return db("workouts")
        .where({ id })
        .first()
        .del();
}