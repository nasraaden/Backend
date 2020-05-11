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
    .then((saved) => {
      res.status(201).json(saved);
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
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
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
