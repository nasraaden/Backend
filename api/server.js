const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//local imports
const authRouter = require('./routes/users/auth-router.js');
const userRouter = require('./routes/users/route.js');
const workoutRouter = require('./routes/workout/route');

// middleware
const authenticate = require('../auth/authenticate-middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(logger);
server.use(express.json());

// Routes
server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);
server.use('/docs', express.static('./docs'));

//global middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.UTC());
  next();
}

server.get('/', (req, res) => {
  return res.status(200).json(`<h1> server is up and running </h1>`);
});

module.exports = server;
