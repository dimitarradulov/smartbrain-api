const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const { authenticateUser } = require('./middlewares/auth-user');
const { handleRegister, handleSignIn } = require('./controllers/auth');
const { handleGetUserProfile } = require('./controllers/profile');
const { handleImage, handleApiCall } = require('./controllers/image');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello!');
});

app.get('/profile/:id', authenticateUser, handleGetUserProfile);

app.post('/sign-in', handleSignIn);
app.post('/register', handleRegister);
app.post('/image-url', authenticateUser, handleApiCall);

app.put('/image', authenticateUser, handleImage);

app.listen(PORT, () => {
  console.log('App is listening on port 3000..');
});
