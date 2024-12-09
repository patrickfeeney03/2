var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const { fetchWeather } = require('./routes/fetchWeather');

let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

// Initial setup
let weatherSchema = new Schema({
  city: {
    type: Object,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
}, { collection: 'weather' });

let weatherData = oldMong.model('weather', weatherSchema);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function fetchInitialWeatherData() {
  try {
    const fetchedData = await fetchWeather(city, countryCode);

    for (let key in fetchedData) {
      const data = {
        city: key,
        data: fetchedData[key].list
      }
      weatherData.create(data);
    }
  } catch (error) {
    console.error('Error fetching initial weather data:', error);
  }
}

fetchInitialWeatherData();

module.exports = app;
