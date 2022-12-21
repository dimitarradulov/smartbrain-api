const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    return res.status(403).json('Unauthorized');
  }

  jwt.verify(idToken, process.env.SECRET_KEY, function (err, decodedUser) {
    if (err) {
      return res.status(403).json('Could not authorize!');
    } else {
      req.user = decodedUser;

      next();
    }
  });
};

module.exports = {
  authenticateUser,
};
