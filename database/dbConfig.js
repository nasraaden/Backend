const knex = require('knex');
const knexConfig = require('../knexfile');
const enviroment = process.env.NODE_ENV || 'development';
module.exports = knex(knexConfig[enviroment]);
