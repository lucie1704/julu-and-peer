const nodemailer = require('nodemailer');
const pug = require('pug');
const logger = require('./logger');
const { convert } = require('html-to-text');
const { Product } = require('../models');
const { Op } = require('sequelize');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

module.exports = class ProductEmail {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `${process.env.USERNAME} <${process.env.EMAIL_FROM}>`;
  }

  async sendProductNotification(template, subject, data) {
    const html = pug.renderFile(`${__dirname}/../views/email/product/${template}.pug`, data);

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    try {
      logger.info(`Envoi de la notification produit à ${this.to} ....`);
      const info = await transporter.sendMail(mailOptions);
      logger.info(`Notification produit envoyée avec succès à ${this.to}, ID du message : ${info.messageId}`);
    } catch (error) {
      logger.error(`Échec de l'envoi de la notification produit à ${this.to} : ${error.message}`);
    }
  }

  async getLatestProducts(limit = 10) {
    return await Product.findAll({
      order: [['createdAt', 'DESC']],
      limit,
      attributes: ['name', 'description', 'price', 'image']
    });
  }

  async getDiscountedProducts(limit = 10) {
    return await Product.findAll({
      where: {
        discount: {
          [Op.gt]: 0
        }
      },
      order: [['updatedAt', 'DESC']],
      limit,
      attributes: ['name', 'description', 'price', 'discount', 'image']
    });
  }

  async newsProduct() {
    const products = await this.getLatestProducts();
    await this.sendProductNotification('newProducts', 'Des nouveaux produits en stock', { products });
  }

  async discountedProduct() {
    const products = await this.getDiscountedProducts();
    await this.sendProductNotification('discountedProducts', 'Des offres de promotions des produits', { products });
  }

  async restockedProduct(products) {
    await this.sendProductNotification('restockedProducts', 'Des nouveaux stocks des produits', { products });
  }
};
