const express = require('express');
const animalController = require('../controllers/animal.controller');
const router = express.Router();

router.get('/', animalController.getAllAnimals);
router.get('/:showBy', animalController.show);
router.post('/store', animalController.addAnimal);

module.exports = router;