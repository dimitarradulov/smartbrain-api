const { knex } = require('../utils/db');
const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
  apiKey: '2fc1dfda952e4bafb5c65b89033ffec6',
});

const handleApiCall = (req, res) => {
  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.imageLink)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(err.message));
};

const handleImage = (req, res) => {
  const { id } = req.user;

  knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((response) => {
      if (!response.length) throw new Error('Unable to get entries.');

      return res.json(response[0].entries);
    })
    .catch((err) => {
      return res.status(404).json(err.message);
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
