import express, { json } from 'express';

const app = express();

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'banana',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(express.json());

app.post('/sign-in', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    return res.json('Success!');
  } else {
    return res.status(400).json('Request failed!');
  }
});

app.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const doUserExist = database.users.some((user) => user.email === email);

  if (doUserExist) {
    return res.json('This email already exists!');
  }

  if (password !== confirmPassword) {
    return res.json('Passwords do not match!');
  }

  database.users.push({
    id: Math.random(),
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });

  console.log(database.users);
  return res.json('Success!');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000..');
});
