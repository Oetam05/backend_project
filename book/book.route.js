const express = require('express');
const router = express.Router();
const bookController = require('./book.controller');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id',authenticate, bookController.updateBook);
router.delete('/:id', authenticate, bookController.deleteBook);
module.exports = router;
