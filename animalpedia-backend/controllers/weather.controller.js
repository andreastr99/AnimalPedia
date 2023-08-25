const axios = require('axios');

async function getForecast(req, res) {
    const city = req.params.city;
    try {
        await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`)
        .then(response =>{
            res.status(200).json(response.data);
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the API.');
    }
}

module.exports = {
    getForecast: getForecast,
}