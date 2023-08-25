const express = require('express');
const imageController = require('../controllers/image.controller');
const router = express.Router();

router.get('/get-image/:image', imageController.getImage);

module.exports = router;