const express = require('express');
const controller = require('../controllers/transactionsController');
const router = express.Router();


router.post('/transactions/add-transaction', controller.add);
router.delete('/transactions/delete-transaction/:id', controller.delete);
router.put('/transactions/filter', controller.filter);
router.put('', controller.user)


module.exports = router;