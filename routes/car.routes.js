const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');

// Rutas para autos
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.post('/register', carController.createCar);
router.put('/:id', carController.updateCarById);
router.patch('/:id', carController.patchCarById);
router.delete('/:id', carController.deleteCarById);

module.exports = router;
