const areFieldsEmpty = (fields) => {
  const fieldsValues = Object.values(fields).map((value) => value.trim());

  return fieldsValues.some((value) => value === '');
};

const isPasswordValid = (password) => {
  return password.length >= 6;
};

const matchingPasswords = (password, confirmPassword) => {
  return password === confirmPassword;
};

const isEmail = (email) => {
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
};

const validateSignInOrRegister = (data) => {
  const error = {};

  if (areFieldsEmpty(data)) {
    error.message = 'Empty fields are not allowed.';
  } else if (!isEmail(data.email)) {
    error.message = 'Invalid email.';
  } else if (!isPasswordValid(data.password)) {
    error.message = 'Invalid password.';
  } else if (
    data.password &&
    data.confirmPassword &&
    !matchingPasswords(data.password, data.confirmPassword)
  ) {
    error.message = 'Passwords are not matching.';
  }

  const valid = Object.keys(error).length === 0;

  return {
    error,
    valid,
  };
};

module.exports = {
  validateSignInOrRegister,
};
