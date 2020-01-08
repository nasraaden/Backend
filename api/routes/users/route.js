const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require("./model")
const secrets = require("../../../database/config/secrets")
const restricted = require("../../../auth/authenticate-middleware");


/**
 * @api {post} /api/register
 * @apiName RegisterUser
 * @apiGroup Users
 * @apiParam {String{...128}} username Username must be unique
 * @apiParam {String{...128}} password Cannont be Null
 *
 * @apiSuccessExample {json} Success-Response-Example:
 * HTTP/1.1 201 Created
 *  {
 *  "id": 2,
 * "username": "admin1",
 * "password": "$2a$08$bZjiTjG1taKufx5s6JuJ8.jm63qoM2dXlk22a9dOPW/Bt8xtWLm9m"
 *   }
 */



router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error);
        })
});


/**
 * @api {post} /api/login
 * @apiName Login
 * @apiGroup Users
 * @apiParam {String{...128}} username Username must exist in the database
 * @apiParam {String{...128}} password Password must match in the database
 *
 * @apiSuccessExample {json} Success-Response-Example:
 *   HTTP/1.1 200 Success
 *   {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTU3ODQwOTg1OCwiZXhwIjoxNTc4NDk2MjU4fQ.NIWZvQiWC1ux1991ZC58SgRxum9GAWuFByORv-2FKoE"
*   }
 */



router.post("/login", (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: "Invalid Credentials" })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error)
        });
})


/**
 * @api {get} /api/users/:id
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiSuccessExample {json} Success-Response-Example:
 *  HTTP/1.1 200 Success
 * {
 * "id": 1,
 * "username": "admin1",
 * "password": "$2a$08$PtMQQMQe7uhe/OVkydT39.9dZK3uLBsNXwuIIcfD5a/jjKXCklPO6"
 * }
 */


router.get("/users/:id", restricted, (req, res) => {
    let id = req.params.id;
    Users.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(400).json({ message: "The specified user does not exist" });
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
});
/**
 * @api {put} /users/:id
 * @apiName EditUser
 * @apiGroup Users
 * @apiParam {String{...128}} username Can be changed
 * @apiParam {String{...128}} password Can be changed
 * @apiSuccesExample {json} Success-Response-Example: \
 * HTTP/1.1 201 OK
 * {
 * "message": "User successfully updated"
 * }
 */

router.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Users.update(id, changes)
        .then(changes => {
            if (changes) {
                res.status(200).json({ message: "User successfully updated" });
            } else {
                res.status(404).json({ message: "The specified user does not exist" });
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
});

function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.id
    };
    const options = {
        expiresIn: "1d",
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;