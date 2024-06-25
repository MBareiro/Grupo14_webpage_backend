const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

//Llamamos al checkToken y lo usamos en las rutas para proteger el acceso a estas
const { checkToken } = require('../utils/middlewares');

// Rutas para usuarios
router.post("/login", userController.login);
router.get('/', checkToken, userController.getUsers);
router.get('/:id', checkToken, userController.getUserById);
router.delete('/:id', checkToken, userController.deleteUserById);
router.post('/register', userController.createUser);
router.put('/:id', checkToken, userController.updateUserById);

module.exports = router;
