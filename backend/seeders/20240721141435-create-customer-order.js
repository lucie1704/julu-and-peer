'use strict';

const { uuidv7 } = require('uuidv7');
const { CustomerOrder, Product, Customer, CustomerAddress, OrderBilling, Shipping } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const products = await Product.findAll({
      limit:2
    })
    const customers = await Customer.findAll({
      limit:2
    })
    const customer1Address = await CustomerAddress.findOne({
      where: {
        customerId: customers[0].id
      },
    })
    const customer2Address = await CustomerAddress.findOne({
      where: {
        customerId: customers[1].id
      },
    })
    const orderBillings = await OrderBilling.findAll({
      limit: 2
    });
    const shippings = await Shipping.findAll({
      limit: 2
    });

    const calculateTotalPrice = (products) => {
      return products.reduce((total, product) => total + product.priceWhenOrdered, 0);
    };

    const customerOrders = [
      {
        id: uuidv7(),
        products: [
          {
            id: products[0].id,
            priceWhenOrdered: 35.95,
            isReturned: false
          },
        ],
        customerId: customers[0].id,
        customerAddressId: customer1Address.id,
        orderBillingId: orderBillings[0].id,
        shippingId: shippings[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv7(),
        products: [
          {
            id: products[0].id,
            priceWhenOrdered: 35.95,
            isReturned: false
          },
          {
            id: products[0].id,
            priceWhenOrdered: 35.95,
            isReturned: false
          },
          {
            id: products[1].id,
            priceWhenOrdered: 29.99,
            isReturned: true
          },
        ],
        // price : 101.44,
        customerId: customers[1].id,
        customerAddressId: customer2Address.id,
        orderBillingId: orderBillings[1].id,
        shippingId: shippings[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    customerOrders.forEach(order => {
      order.price = calculateTotalPrice(order.products);
    });
    
    await CustomerOrder.bulkCreate(customerOrders,  { individualHooks: true });
  },

  async down (queryInterface, Sequelize) {
  }
};
