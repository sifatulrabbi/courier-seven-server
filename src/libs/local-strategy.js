const { Strategy } = require("passport-local");

/**
 * @function verify
 * @params (email: string, password: string, done: (err, user, {message: string}) => void)
 */
function verify(email, password, done) {}

const localStrategy = new Strategy({
  usernameField: "mobile",
  passwordField: "password",
  verify,
});

module.exports = localStrategy;
