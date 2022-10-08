const { knex } = require('../utils/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { validateSignInOrRegister } = require('../utils/validations');

const generateUserWithToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '30m' });

  return { ...user, token, tokenExpiresIn: '1800000' };
};

const handleRegister = async (req, res) => {
  const { error, valid } = validateSignInOrRegister(req.body);
  if (!valid) {
    return res.status(400).json(error.message);
  }

  const { name, email, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      if (err) throw new Error(err);

      await knex.transaction(async (trx) => {
        const loginEmail = await trx
          .insert({
            hash,
            email,
          })
          .into('login')
          .returning('email');

        const user = await trx('users').returning('*').insert({
          email: loginEmail[0].email,
          name,
          joined: new Date(),
        });

        return res.json(generateUserWithToken(user[0]));
      });
    } catch (err) {
      return res.status(400).json('User already exists.');
    }
  });
};

const handleSignIn = (req, res) => {
  const { error, valid } = validateSignInOrRegister(req.body);
  if (!valid) {
    return res.status(400).json(error.message);
  }

  const { email, password } = req.body;

  knex
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((response) => {
      const hashedPassword = response[0].hash;

      return bcrypt.compare(password, hashedPassword);
    })
    .then((result) => {
      if (!result) throw new Error('Wrong username and password combination.');

      return knex.select('*').from('users').where('email', '=', email);
    })
    .then((user) => res.json(generateUserWithToken(user[0])))
    .catch((err) => {
      return res.status(400).json(err.message);
    });
};

module.exports = {
  handleRegister,
  handleSignIn,
};
