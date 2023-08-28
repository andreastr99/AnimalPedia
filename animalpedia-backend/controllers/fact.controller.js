const axios = require('axios');
const Redis = require('redis')

const redisClient = Redis.createClient();
redisClient.connect();

async function getFact(req, res) {
    
    let redisResult = await redisClient.get('fact')
    if (redisResult) {
        const results = JSON.parse(redisResult);
        return res.status(200).json(results);
    } else {
        try {
            const response = await axios.get('https://api.api-ninjas.com/v1/facts?limit=1', {
                headers: {
                    'X-Api-Key': process.env.NINJA_API_KEY
                }
            });
            // Send the API response back to the client
            await redisClient.set('fact', JSON.stringify(response.data[0].fact));
            redisClient.expire('fact', 86400);
            return res.status(200).json(response.data[0].fact)
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data from the fact API.');
        }
    }
}

module.exports = {
    getFact: getFact,
}