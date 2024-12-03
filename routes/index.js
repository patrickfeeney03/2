var express = require('express');
const { fetchWeather } = require('./fetchWeather');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  fetchWeather();
  res.render('index', { title: 'Express' });
});

module.exports = router;
