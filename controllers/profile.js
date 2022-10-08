const { knex } = require('../utils/db');

const handleGetUserProfile = (req, res) => {
  const { id } = req.user;

  knex('users')
    .where({ id })
    .then((response) => {
      if (!response.length) throw new Error('User not found.');

      return res.json(response[0]);
    })
    .catch((err) => {
      return res.status(404).json(err.message);
    });
};

module.exports = {
  handleGetUserProfile,
};
