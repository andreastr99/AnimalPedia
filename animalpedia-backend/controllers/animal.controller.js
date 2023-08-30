
const AnimalModel = require('../models/animalModel')

function getAllAnimals(req, res) {
    AnimalModel.find().then(response => {
        res.status(200).json(response[0])
    })
        .catch(error => {
            res.status(500).json({
                message: "Error retrieving all data!"
            })
        })
}

function addAnimal(req, res) {
    const { name, classs, continent, details, youtbeLink, favourite, image } = req.body;

    let animal = new AnimalModel({
        name: name,
        classs: classs, 
        continent: continent,  
        details: details, 
        youtbeLink: youtbeLink, 
        favourite: favourite,
        image: image
    })

    animal.save().then(response =>{
        res.status(200).json({
            message: "Animal added successfully!"
        })
    })
    .catch(error => {
        console.error(error)
        res.status(500).json({
            message: "An error occured!"
        })
    })
}

module.exports = {
    getAllAnimals: getAllAnimals,
    addAnimal: addAnimal,
}