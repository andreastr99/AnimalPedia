const express = require('express');
const animalController = require('../controllers/animal.controller');
const router = express.Router();

router.get('/get-animal/:animal_name', animalController.getAnimal);
// router.get('/animal/:animalName', animalController.getAnimal);

module.exports = router;