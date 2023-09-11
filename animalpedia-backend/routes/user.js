const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.register);
router.get('/refreshToken', userController.refreshToken);
router.get('/verifyToken', userController.verifyToken);

module.exports = router;