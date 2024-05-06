const express = require('express');
const router = express.Router();
const bookController = require('./book.controller');

router.post('/', bookController.createBook);
router.get('/', bookController.getBooks);
// Agrega rutas para actualizar y eliminar
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
module.exports = router;
