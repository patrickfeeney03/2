var express = require('express');
const { fetchWeather } = require('./fetchWeather');
var router = express.Router();



/* GET Weather Data. */
router.get('/', async function (req, res, next) {
  // Extract city and countryCode from query params
  const { city, countryCode } = req.query

  if (!city || !countryCode) {
    return res.status(400).json({ error: 'City and countryCode are required' });
  }

  try {
    const weatherData = await fetchWeather(city, countryCode); // Pass the city and countryCode to the fetchWeather function
    res.json(weatherData); // Send the weather data back as a JSON response
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

router.get('/all', async function (req, res, next) {
  const data = await 

});

module.exports = router;
