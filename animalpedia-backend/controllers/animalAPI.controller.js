const axios = require('axios');
const Redis = require('redis')

const redisClient = Redis.createClient();
redisClient.connect();

async function getAnimal(req, res) {
    const animal_name = req.params.animal_name;
    let redisResult = await redisClient.get(animal_name)
    if (redisResult) {
        const results = JSON.parse(redisResult);
        return res.status(200).json(results);
    } else {
        try {
            const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=' + animal_name, {
                headers: {
                    'X-Api-Key': process.env.NINJA_API_KEY
                }
            });

            const data = {
                name: [
                    response.data[0].name,
                    response.data[0].taxonomy.scientific_name,
                ],
                class: response.data[0].taxonomy.class,
                order: response.data[0].taxonomy.order,
                continent: response.data[0].locations,
                characteristics: [{
                    lifespan: response.data[0].characteristics.lifespan,
                    weight: response.data[0].characteristics.weight,
                    length: response.data[0].characteristics.length,
                    age_of_sexual_maturity: response.data[0].characteristics.age_of_sexual_maturity,
                    age_of_weaning: response.data[0].characteristics.age_of_weaning,
                    biggest_threat: response.data[0].characteristics.biggest_threat,
                }]
            }

            // Send the API response back to the client
            await redisClient.set(animal_name, JSON.stringify(data));
            redisClient.expire(animal_name, 3600);
            // return res.json(response.data[0]);
            return res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data from the animal API.');
        }
    }
}

module.exports = {
    getAnimal: getAnimal,
}