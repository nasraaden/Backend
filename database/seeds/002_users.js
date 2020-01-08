const bcrypt = require("bcryptjs")
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'dumbuser1 ', password: bcrypt.hashSync("dumb", 8) },
        { username: 'dumbuser2 ', password: bcrypt.hashSync("dumb2", 8) },
        { username: 'dumbuser3 ', password: bcrypt.hashSync("dumb3", 8) }
      ]);
    });
};
