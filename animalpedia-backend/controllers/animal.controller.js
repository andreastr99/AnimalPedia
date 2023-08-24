const axios = require('axios');
const Redis = require('redis')

const redisClient = Redis.createClient();
redisClient.connect();

async function getAnimal(req, res) {
    const animal_name = req.params.animal_name;
    let redisResult = await redisClient.get('animal')
    if (redisResult) {
        const results = JSON.parse(redisResult);
        return res.status(200).json(results);
    } else {
        try {
            const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=' + animal_name, {
                headers: {
                    'X-Api-Key': process.env.API_KEY
                }
            });

            // Send the API response back to the client
            await redisClient.set('animal', JSON.stringify(response.data[0]));
            redisClient.expire('animal', 3600);
            return res.json(response.data[0]);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data from the API.');
        }
    }
}

module.exports = {
    getAnimal: getAnimal,
}