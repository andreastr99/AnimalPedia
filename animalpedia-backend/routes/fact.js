const express = require('express');
const factController = require('../controllers/fact.controller');
const router = express.Router();

router.get('/get-fact', factController.getFact);

module.exports = router;