const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { validateToken } = require('../middlewares/Auth');


router.post('/register', UserController.registerUser);
router.post('/login', UserController.login);

router.get('/verify', validateToken, UserController.verifyToken);
router.patch('/:id', validateToken, UserController.editProfile);

module.exports = router