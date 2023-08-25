const axios = require('axios');
const Redis = require('redis')

const redisClient = Redis.createClient();
redisClient.connect();
async function getForecast(req, res) {
    const city = req.params.city;

    let redisResult = await redisClient.get('weather')
    if (redisResult) {
        const results = JSON.parse(redisResult);
        return res.status(200).json(results);
    } else {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`)

            const data = {
                name: response.data.location.name,
                localtime: response.data.location.localtime.split(" ")[1],
                temp_c: response.data.current.temp_c,
                text: response.data.current.condition.text,
                wind_kph: response.data.current.wind_kph,
                humidity: response.data.current.humidity,
                feelslike_c: response.data.current.feelslike_c,
                icon: response.data.current.condition.icon
            }
             // Send the API response back to the client
             await redisClient.set('weather', JSON.stringify(data));
             redisClient.expire('weather', 3600);

             return res.status(200).json({
                name: response.data.location.name,
                localtime: response.data.location.localtime.split(" ")[1],
                temp_c: response.data.current.temp_c,
                text: response.data.current.condition.text,
                wind_kph: response.data.current.wind_kph,
                humidity: response.data.current.humidity,
                feelslike_c: response.data.current.feelslike_c,
                icon: response.data.current.condition.icon
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data from the API.');
        }
    }
}

module.exports = {
    getForecast: getForecast,
}