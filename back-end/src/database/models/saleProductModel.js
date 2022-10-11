module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      foreignKey: true,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SalesProduct.associate = (models) => {
    // relação: N saleId para N salesProducts
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'saleId',
      as: 'products',
      through: SalesProduct,
      otherKey: 'productId',
    });

    // relação: N productId para N salesProducts
    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'productId',
      as: 'orders',
      through: SalesProduct,
      otherKey: 'saleId',
    });
  };

  return SalesProduct;
};
