const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, orderController.createOrder);
router.get('/', authenticate, orderController.getOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.put('/update', authenticate, orderController.updateOrder);
router.delete('/:id', authenticate, orderController.deleteOrder);

module.exports = router;