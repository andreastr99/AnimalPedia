const express = require('express');
const animalController = require('../controllers/animal.controller');
const middleware = require('../middleware/authentication');

const router = express.Router();

router.get('/', animalController.getAllAnimals);
router.get('/get-favourites', middleware.checkAuth, animalController.getFavourites);
router.get('/:animalID', animalController.getAnimal);
router.post('/store', animalController.addAnimal);
router.put('/:animalID', animalController.setLike);

module.exports = router;