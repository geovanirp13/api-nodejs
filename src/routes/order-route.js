const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');

router.post('/', orderController.post);
router.get('/', orderController.get);

module.exports = router;