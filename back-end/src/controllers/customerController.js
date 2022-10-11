const customerService = require('../services/customerService');

module.exports = {
  async getAllProducts(_req, res) {
    const products = await customerService.getAllProducts();
    res.status(200).json(products);
  },

  async getAllSellers(_req, res) {
    const sellers = await customerService.getAllSellers();
    res.status(200).json(sellers);
  },

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await customerService.getProductById(id);
    res.status(200).json(product);
  },

  async getOrdersByCustomerId(req, res) {
    // console.log(req.id);
    const orders = await customerService.getOrdersByCustomerId(req.id);
    res.status(200).json(orders);
  },

  async createSale(req, res) {
    // console.log(req.id);
    const order = req.body;
    const created = await customerService.createSale(req.id, order);
    res.status(201).json(created);
  },

  async getOrderByOrderId(req, res) {
    const { id } = req.params;
    const userId = req.id;
    const order = await customerService.getOrderByOrderId(userId, id);
    res.status(200).json(order);
  },
};
