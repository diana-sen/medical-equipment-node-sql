var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config(); // module for environment variables
//console.log(process.env); // test dotenv
var indexRouter = require('./routes/index');
const package = require('./package.json');

var app = express();

var areasRouter = require("./routes/areas");
//var medicalEquipmentsRouter = require("./routes/medical-equipments");

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/v1', indexRouter);
app.use("/api/v1/areas", areasRouter);
//app.use("/api/v1/medical-equipments", medicalEquipmentsRouter);


//not found route
app.use("*", (req, res, next) =>
      res.status(404).send({message: "Not found"})
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
