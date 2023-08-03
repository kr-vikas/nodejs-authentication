const router = require('express').Router();
const { register, login, profile } = require('./users.controllers');
const { verifyToken } = require("../../middleware/authentication");

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, profile);

module.exports = router;