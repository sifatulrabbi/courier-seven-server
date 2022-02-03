const MongoStore = require("connect-mongo");
const { SESSION_SECRET, COOKIE_MAX_AGE, MONGODB_URI } = require("./config");

const sessionConfig = {
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
  },
  store: new MongoStore({
    collectionName: "users-session",
    mongoUrl: MONGODB_URI,
    ttl: COOKIE_MAX_AGE,
    autoRemove: "native",
  }),
};

module.exports = sessionConfig;
