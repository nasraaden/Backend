
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/weightlifting.db3'
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    },

  },


  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/weightlifting"
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }

};
