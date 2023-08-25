const express = require('express');
const weatherController = require('../controllers/weather.controller');
const router = express.Router();

router.get('/get-forecast/:city', weatherController.getForecast);

module.exports = router;