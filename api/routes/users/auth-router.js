const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../../database/config/secrets');

const Users = require('./model');

const { validateUserData } = require('../../../middleware/all-middleware.js');

router.post('/register', validateUserData, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then((newUser) => {
      const token = generateToken(newUser);
      const { id, username } = newUser;
      res.status(201).json({ id, username, token });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post('/login', validateUserData, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        const { id, username } = user;
        res.status(200).json({ id, username, token });
      } else {
        res
          .status(401)
          .json({ message: 'Invalid Credentials, Not Authorized ' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// GENERATE TOKEN
function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
