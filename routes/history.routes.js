const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');

// Rutas para historias
router.get('/', historyController.getAllHistories);
router.get('/:id', historyController.getHistoryById);
router.post('/', historyController.createHistory);
router.put('/:id', historyController.updateHistoryById);
router.patch('/:id', historyController.patchHistoryById);
router.delete('/:id', historyController.deleteHistoryById);

module.exports = router;
