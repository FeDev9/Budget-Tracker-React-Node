const express = require('express');
const controller = require('../controllers/transactionsController');
const { route } = require('./pages');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/add-transaction', controller.add);
router.delete('/delete-transaction', controller.delete);
router.post('/filter', controller.filter);


module.exports = router;