const AnimalModel = require('../models/animalModel')

function getAllAnimals(req, res) {
    AnimalModel.find().then(response => {
        return res.status(200).json(response)
    })
        .catch(error => {
            return res.status(500).json({
                message: "Error retrieving all data!"
            })
        })
}

// function show(req, res) {
//     // Define a query object to filter by continent if provided
//     const showBy = req.params.showBy;

//     const query = {};

//     // Add filters based on the provided parameter
//     if (showBy) {
//         query.$or = [
//             { "name.common": showBy },
//             { "class": showBy },
//             { "continent": showBy }
//         ];
//     }

//     AnimalModel.find(query).then(response => {
//         res.status(200).json(response)
//     })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Error retrieving data!"
//             })
//         })
// }

function getAnimal(req, res) {

    const animalID = req.params.animalID;

    AnimalModel.findById(animalID)
        .then(response => {
            return res.json(response)
        })
        .catch(error => {
            return res.json({
                message: "Error while trying to get an animal!"
            })
        })
}


function addAnimal(req, res) {
    const { name, classs, continent, details, youtube, favourite, image } = req.body;

    let animal = new AnimalModel({
        name: name,
        classs: classs,
        continent: continent,
        details: details,
        youtube: youtube,
        favourite: favourite,
        image: image
    })

    animal.save().then(response => {
        return res.status(200).json({
            message: "Animal added successfully!"
        })
    })
        .catch(error => {
            console.error(error)
            return res.status(500).json({
                message: "An error occured!"
            })
        })
}

function setLike(req, res) {
    const animalId = req.params.animalID;

    const like = req.body.favourite;
    AnimalModel.findByIdAndUpdate(animalId, { $set: { favourite: like } })
        .then(response => {
            return res.status(200).json({
                message: "Record Updated Successfully!"
            })
        })
        .catch(error => {
            return res.json({
                message: "An error occured while trying to update favourites"
            })
        })
}

function getFavourites(req, res) {
    AnimalModel.find({ favourite: true }).then(response => {
        return res.status(200).json(response)
    })
        .catch(error => {
            return res.status(500).json({
                message: "Error while trying to retrieve all favourite animals"
            })
        })
}

module.exports = {
    getAllAnimals: getAllAnimals,
    getAnimal: getAnimal,
    addAnimal: addAnimal,
    setLike: setLike,
    getFavourites: getFavourites,
}