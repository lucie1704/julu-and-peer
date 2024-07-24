'use strict';

const { uuidv7 } = require('uuidv7');
const { CustomerOrder, Product, Customer, CustomerAddress, OrderBilling, Shipping } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const numberOfCustomers = 10;
    const numberOfOrdersPerCustomer = 5;
    
    const products = await Product.findAll({
      limit: 2
    });

    const customers = await Customer.findAll({
      limit: numberOfCustomers
    });

    const orderBillings = await OrderBilling.findAll({
      limit: numberOfCustomers
    });

    const shippings = await Shipping.findAll({
      limit: numberOfCustomers
    });

    const calculateTotalPrice = (products) => {
      return products.reduce((total, product) => total + product.priceWhenOrdered, 0);
    };

    const customerOrders = [];

    for (let i = 0; i < numberOfCustomers; i++) {
      const customer = customers[i];
      const customerAddress = await CustomerAddress.findOne({
        where: {
          customerId: customer.id
        },
      });

      for (let j = 0; j < numberOfOrdersPerCustomer; j++) {
        const orderProducts = [
          {
            id: products[0].id,
            priceWhenOrdered: 35.95,
            isReturned: false
          },
          {
            id: products[1].id,
            priceWhenOrdered: 29.99,
            isReturned: j % 2 === 0 
          }
        ];

        const order = {
          id: uuidv7(),
          products: orderProducts,
          customerId: customer.id,
          customerAddressId: customerAddress.id,
          orderBillingId: orderBillings[i % orderBillings.length].id,
          shippingId: shippings[i % shippings.length].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        order.price = calculateTotalPrice(order.products);

        customerOrders.push(order);
      }
    }

    await CustomerOrder.bulkCreate(customerOrders, { individualHooks: true });
  },

  async down (queryInterface, Sequelize) {
    // Logic to revert the migration
  }
};
