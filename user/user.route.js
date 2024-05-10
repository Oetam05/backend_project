const router = require('express').Router();
const userController = require('./user.controller');
const authenticate = require('../middleware/authenticate');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id',authenticate, userController.getUser);
router.put('/', authenticate, userController.updateUser);
router.delete('/', authenticate, userController.deleteUser);

module.exports = router;
