require('dotenv').config();

async function fetchWeather() {
    const countryCode = 'IE';
    const citiesOfInterest = ['galway', 'dublin', 'cork', 'wexford', 'sligo', 'ennis'];
    let results = {};
    const apiKey = process.env.openweatherAPI_KEY;

    const fetchPromises = citiesOfInterest.map(async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        results[city] = data;
    });

    await Promise.all(fetchPromises); // crazy stuff. Learnt this at work.

    return results;
}

module.exports = { fetchWeather };
