const axios = require('axios');
const Redis = require('redis')

const redisClient = Redis.createClient();
redisClient.connect();

async function getImage(req, res) {
    const image = req.params.image;
    let animalImage = image + "Image";
    let redisResult = await redisClient.get(animalImage)
    if (redisResult) {
        const results = JSON.parse(redisResult);
        return res.status(200).json(results);
    } else {
        try {
            axios.get(`https://pixabay.com/api/?key=${process.env.IMAGE_API_KEY}&q=${image}&image_type=photo`)
                .then(async response => {
                    
                    await redisClient.set(animalImage, JSON.stringify(response.data.hits[0].webformatURL));
                    redisClient.expire(animalImage, 3600);
                    return res.status(200).json(response.data.hits[0].webformatURL)
                })

        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data from the image API.');
        }
    }
}

module.exports = {
    getImage: getImage,
}