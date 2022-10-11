const { Router } = require('express');

const seller = require('../controllers/sellerController');

const router = Router();

router.get('/orders', seller.getAll);
router.get('/orders/:id', seller.getById);
router.put('/orders/:id', seller.update);

module.exports = router;
