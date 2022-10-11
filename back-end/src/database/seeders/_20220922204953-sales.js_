'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 2,
        seller_id: 1,
        total_price: 45.67,
        delivery_address: 'Rua Abc',
        delivery_number: '632',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 2,
        user_id: 2,
        seller_id: 1,
        total_price: 88.13,
        delivery_address: 'Rua Abc',
        delivery_number: '632',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 3,
        user_id: 2,
        seller_id: 2,
        total_price: 45.67,
        delivery_address: 'Rua Abc',
        delivery_number: '632',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 4,
        user_id: 2,
        seller_id: 2,
        total_price: 45.67,
        delivery_address: 'Rua Abc',
        delivery_number: '632',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 5,
        user_id: 2,
        seller_id: 3,
        total_price: 15.33,
        delivery_address: 'Rua Abc',
        delivery_number: '632',
        sale_date: new Date(),
        status: 'Preparando',
      },
      {
        id: 6,
        user_id: 2,
        seller_id: 3,
        total_price: 65.67,
        delivery_address: 'Rua Abc',
        delivery_number: '632',
        sale_date: new Date(),
        status: 'Preparando',
      },

    ], { timestamps: true });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
