const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout',authenticateToken , AuthController.logout);

module.exports = router;
