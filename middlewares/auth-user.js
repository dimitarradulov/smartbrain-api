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

  jwt.verify(idToken, 'ilovegoats', function (err, decodedUser) {
    if (err) {
      return res.status(403).json(err);
    } else {
      req.user = decodedUser;

      next();
    }
  });
};

module.exports = {
  authenticateUser,
};
