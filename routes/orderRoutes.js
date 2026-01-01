const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const { authenticate, authorizeUser } = require('../middleware/auth');
const { validateOrder } = require('../utils/validation');


router.post('/', authenticate, authorizeUser, validateOrder, createOrder);
router.get('/', authenticate, getOrders);

module.exports = router;





