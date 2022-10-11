module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    timestamps: true,
    createdAt: 'saleDate',
    updatedAt: 'saleDate',
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    // relação: 1 userId para N sales
    Sale.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'sellers' },
    );
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'users' },
    );
  };

  return Sale;
};
