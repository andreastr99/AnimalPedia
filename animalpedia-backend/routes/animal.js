const express = require('express');
const animalController = require('../controllers/animal.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', animalController.getAllAnimals);
router.get('/get-favourites', animalController.getFavourites);
router.get('/:animalID', animalController.getAnimal);
router.post('/store', animalController.addAnimal);
router.put('/:animalID', animalController.setLike);

module.exports = router;