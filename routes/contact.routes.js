const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Rutas para contactos
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContactById);
router.patch('/:id', contactController.patchContactById); 
router.delete('/:id', contactController.deleteContactById);

module.exports = router;
