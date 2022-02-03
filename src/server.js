const https = require("https");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParse = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");

const { PROD } = require("./configs/config");
const sessionConfig = require("./configs/session");
const localStrategy = require("./libs/local-strategy");
const connectDb = require("./libs/connect-db");
const showLogs = require("./libs/logger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(cookieParse());
// session
app.use(session(sessionConfig));
// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);

showLogs(app);

const server = https.createServer(app);
server.listen(5000, () => {
  connectDb();

  if (!PROD) {
    console.log("Server is up and running");
  }
});
