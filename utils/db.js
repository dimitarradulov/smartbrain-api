const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '141196',
    database: 'smartbrain',
  },
});

module.exports = { knex };
