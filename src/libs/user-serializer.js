function userSerializer(user, done) {
  done(null, user._id);
}

module.exports = userSerializer;
