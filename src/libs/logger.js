// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require("morgan");
const { PROD } = require("../configs/config");

function showLogs(app) {
  if (!PROD) {
    app.use(morgan("dev"));
  }
}

module.exports = showLogs;
