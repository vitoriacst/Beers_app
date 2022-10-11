const Seller = require('../services/sellerService');

module.exports = {
  async getAll(req, res) {
    const token = req.headers.authorization;

    const orders = await Seller.getAll(token);

    return res.status(200).json(orders);
  },

  async getById(req, res) {
    const token = req.headers.authorization;
    const { id } = req.params;

    const orders = await Seller.getById(token, id);

    return res.status(200).json(orders);
  },
  
  async update(req, res) {
    const { saleStatus } = req.body;
    const { id } = req.params;

    const orders = await Seller.update(saleStatus, id);

    return res.status(200).json(orders);
  },
};
