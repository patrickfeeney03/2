var express = require('express');
const { fetchWeather } = require('./fetchWeather');
var router = express.Router();

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

router.get('/all', async function (req, res, next) {
  const data = await weatherData.find();
  res.json(data);
});

module.exports = router;
