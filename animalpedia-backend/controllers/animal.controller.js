const axios = require('axios');

async function getAnimal(req, res) {
    const animal_name = req.params.animal_name;

    try{
        const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=' + animal_name, {
            headers: {
                'X-Api-Key': process.env.API_KEY
            }
        });

        // Send the API response back to the client
        res.json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).send('Error fetching data from the API.');
    }
}

module.exports = {
    getAnimal: getAnimal,
}