// const { Op } = require('sequelize');
const { User, Product, Sale, SalesProduct } = require('../database/models');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async getAllProducts() {
    const products = await Product.findAll();
    if (!products) {
      throw new CustomError(404, 'Not found');
    }
    return products;
  },

  async getAllSellers() {
    const sellers = await User.findAll({ where: { role: 'seller' } });
    if (!sellers) {
      throw new CustomError(404, 'Not found');
    }
    // retornar apenas um array com os nomes dos vendedores
    const names = sellers.map((seller) => ({
      id: seller.id, 
      name: seller.name,
    }));
    return names;
  },

  async getProductById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new CustomError(404, 'Not found');
    }
    return product;
  },

  async getOrdersByCustomerId(id) {
    const ordersByUserId = await Sale.findAll({ where: { userId: id } });
    
    if (!ordersByUserId) throw new CustomError(404, 'Not found');
    return ordersByUserId;
  },

  async getOrderByOrderId(userId, id) {
    // Eagle
    const orderById = await Sale.findOne({ 
      where: { id },
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
    
    if (!orderById) throw new CustomError(404, 'Not found');
    // verifica se a order pertence ao usuario logado (do token)
    if (userId !== orderById.userId) throw new CustomError(404, 'Unauthorized User');
    return orderById;
  },

  async createSale(userId, order) {
    const createOrder = {
        userId,
        sellerId: order.sellerId,
        totalPrice: order.totalPrice,
        deliveryAddress: order.deliveryAddress,
        deliveryNumber: order.deliveryNumber,
        status: 'Pendente',
      };   
    const itemInserted = await Sale.create(createOrder);
    await this.bulkCreateBySale(itemInserted.id, order.items);
    return itemInserted;
  },
  
  async bulkCreateBySale(saleId, items) {
    const map = items.map((item) => (
      {
        saleId,
        productId: item.productId,
        quantity: item.quantity,
      }));
    await SalesProduct.bulkCreate(map);
  },
};
