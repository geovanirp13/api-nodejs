const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller');

router.post('/', customerController.post);
router.get('/', customerController.get);
router.post('/authenticate', customerController.authenticate);

module.exports = router;