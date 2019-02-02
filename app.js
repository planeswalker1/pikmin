const express = require('express');
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');

let app = express();
const config = require('./app/models/config');
const indexRoutes = require('./routes/index.js');

// serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

// setup logger
if (app.get('env') === 'development') app.locals.dev = true;
if (app.locals.dev) app.use(logger('dev'));

// setup index routes
app.use('/', indexRoutes);

// 404 route
app.use(function (req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// development error handler
if (app.locals.dev) {
  app.use(function (err, req, res, next) {
    console.log(err);
    return res.status(err.status || 500).send();
  });
}

// production error handler
app.use(function (err, req, res, next) {
  return res.status(err.status || 500).send();
});


app.listen(config.PORT, function () {
  console.log('Listening at http://localhost:%s in %s mode', config.PORT, app.get('env'))
});