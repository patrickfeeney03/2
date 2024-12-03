require('dotenv').config();

async function fetchWeather(city, countryCode) {
    const apiKey = process.env.openweatherAPI_KEY;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response failed');
        }
        const data = await response.json();

        // pass response to frontend (or log it in this case)
        // console.log(data);
        return data; // Return data so that it can be sent in the response
    } catch (error) {
        console.error('Error occurred with the fetch operation:', error);
        throw error; // Propagate error
    }
}

module.exports = { fetchWeather };
