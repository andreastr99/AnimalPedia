const axios = require('axios');

async function getForecast(req, res) {
    const city = req.params.city;
    try {
        await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`)
        .then(response =>{
           
            res.status(200).json({
                name: response.data.location.name,
                localtime: response.data.location.localtime,
                temp_c: response.data.current.temp_c,
                text: response.data.current.condition.text,
                wind_kph: response.data.current.wind_kph,
                humidity: response.data.current.humidity,
                feelslike_c: response.data.current.feelslike_c,
                icon: response.data.current.condition.icon
            });
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the API.');
    }
}

module.exports = {
    getForecast: getForecast,
}