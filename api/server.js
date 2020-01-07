const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


// middleware
const authenicate = require('../auth/authenticate-middleware');

const server = express();


server.use(helmet());
server.use(cors());
server.use(logger);
server.use(express.json());


//global middleware

function logger(req, res, next) {
    console.log(req.method, req.url, Date.UTC());
    next();
}

server.get("/", (req, res) => {
    return res.status(200).json(`<h1> server is up and running </h1>`);
});


module.exports = server;