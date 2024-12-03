async function fetchWeather() {

    let apiKey = 'KEY';
    let city = 'Galway'
    let country_code = 'IE'
    let lat = 53.2744122
    let lon = -9.0490601

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country_code}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response failed');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error occured with the fetch operation:', error);
    }
}

module.exports = { fetchWeather } 