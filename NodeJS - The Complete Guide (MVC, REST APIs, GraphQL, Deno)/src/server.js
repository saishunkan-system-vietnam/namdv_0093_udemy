const express = require('express');
const expressWinston = require('express-winston');
const cookieParser = require('cookie-parser');

// catch error finally
require('express-async-errors');
const app = express();
require('dotenv').config(
  { path: require('path').resolve(__dirname, `../.env`) }
);
const routes = require('./routes/index.route');
const { optionsLog } = require('./utils/log.util');
const socket = require('./socket/connect.socket');
// log info
app.use(expressWinston.logger(optionsLog));
// log for each req and res
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
// read req.body
app.use(express.json());
app.use(cookieParser());
routes(app);
console.log(process.env.APP_PORT);
const port = process.env.APP_PORT || 3006;
const server = require('http').createServer(app);
socket(server);

server.listen(port, () => {
  console.log(`app be start at ${port}`);
});

module.exports = app;