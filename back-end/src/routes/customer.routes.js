const { Router } = require('express');
const customerController = require('../controllers/customerController');
const validateToken = require('../middlewares/validations/token.validation');

const customerRouter = Router();
customerRouter.use(validateToken);
customerRouter.get('/products/:id', customerController.getProductById);
customerRouter.get('/products', customerController.getAllProducts);
customerRouter.get('/checkout', customerController.getAllSellers);
customerRouter.get('/orders/:id', customerController.getOrderByOrderId);
customerRouter.get('/orders', customerController.getOrdersByCustomerId);
customerRouter.post('/orders', customerController.createSale);

module.exports = customerRouter;
