const express = require('express');
const animalController = require('../controllers/animal.controller');
const router = express.Router();

router.get('/', animalController.getAllAnimals);
router.post('/store', animalController.addAnimal);

module.exports = router;