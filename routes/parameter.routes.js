const express = require('express');
const router = express.Router();
const parameterController = require('../controllers/parameter.controller');

//Llamamos al checkToken y lo usamos en las rutas para proteger el acceso a estas
const { checkToken } = require('../utils/middlewares');

// Rutas para parámetros
router.get('/', parameterController.getAllParameters);
router.get('/:id', parameterController.getParameterById);
router.post('/', parameterController.createParameter);
router.put('/:id', parameterController.updateParameterById);
router.patch('/:id', parameterController.patchParameterById);
router.delete('/:id', checkToken, parameterController.deleteParameterById);

module.exports = router;
