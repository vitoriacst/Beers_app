const { Op } = require('sequelize');
const { Sale, User, Product } = require('../database/models');
const jwt = require('../middlewares/auth/JwtService');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async getAll(token) {
    const { id, role } = await jwt.verify(token);

    if (role === 'customer') throw new CustomError(401, 'Unauthorized');

    const orders = await Sale.findAll({ where: { sellerId: id } });
    
    return orders;
  },

  async getById(token, sellId) {
    const { role, id } = jwt.verify(token);

    if (role === 'customer') throw new CustomError(401, 'Unauthorized - Must be a Seller');

    const orderById = await Sale.findOne({ 
      where: { [Op.and]: [{ id: sellId }, { sellerId: id }] },
      include: [
        { model: User,
          as: 'sellers',
          attributes: ['name'],
        },
        { model: Product, 
          as: 'products', 
          through: { attributes: ['quantity'] },
        }],
    });

    if (!orderById) throw new CustomError(401, 'Unauthorized - wrong seller');

    return orderById;
  },

  async update(saleStatus, sellId) {
    await Sale.update({ status: saleStatus }, { where: { id: sellId } });

    return 'Update successfully';
  },
};
