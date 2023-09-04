const AnimalModel = require('../models/animalModel')

function getAllAnimals(req, res) {
    AnimalModel.find().then(response => {
        res.status(200).json(response)
    })
        .catch(error => {
            res.status(500).json({
                message: "Error retrieving all data!"
            })
        })
}

function show(req, res) {
    // Define a query object to filter by continent if provided
    const showBy = req.params.showBy;

    const query = {};

    // Add filters based on the provided parameter
    if (showBy) {
        query.$or = [
            { "name.common": showBy },
            { "class": showBy },
            { "continent": showBy }
        ];
    }

    AnimalModel.find(query).then(response => {
        res.status(200).json(response)
    })
        .catch(error => {
            res.status(500).json({
                message: "Error retrieving data!"
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

    animal.save().then(response => {
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

function setLike(req, res) {
    const animalId =  req.params.animalID;
    
    const like = req.body.favourite;
    AnimalModel.findByIdAndUpdate(animalId, {$set: {favourite: like}})
    .then(response => {
        res.status(200).json({
            message: "Record Updated Successfully!"
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured while trying to update favourites"
        })
    })
}

module.exports = {
    getAllAnimals: getAllAnimals,
    show: show,
    addAnimal: addAnimal,
    setLike: setLike,
}