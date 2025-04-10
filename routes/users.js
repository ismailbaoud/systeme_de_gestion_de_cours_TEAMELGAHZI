var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');
const authenticateToken = require('../middleware/authenticateToken');
/* Authontification. */
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout',authenticateToken , AuthController.logout);

module.exports = router;
