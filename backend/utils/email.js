const nodemailer = require('nodemailer');
const pug = require('pug');
const logger = require('./logger');
const {convert} = require('html-to-text');


// const transporter = nodemailer.createTransport({
//   host: process.env.MAILTRAP_HOST,
//   port:  process.env.MAILTRAP_PORT,
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS,
//   },
// });

console.log("process.env.GMAIL_USER", process.env.GMAIL_USER)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `${process.env.USERNAME} <${process.env.EMAIL_FROM}>`;
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    if(this.to == "julupeervinyle@gmail.com") {
      try {
        logger.info(`Envoi de l'email à ${this.to} ....`);
        const info = await transporter.sendMail(mailOptions);
        logger.info(`Email envoyé avec succès à ${this.to}, ID du message : ${info.messageId}`);
      } catch (error) {
        logger.error(`Échec de l'envoi de l'email à ${this.to} : ${error.message}`);
      }
    }
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
      logger.info(`Envoi de la notification produit à ${this.to}`);
      const info = await transporter.sendMail(mailOptions);
      logger.info(`Notification produit envoyée avec succès à ${this.to}, ID du message : ${info.messageId}`);
    } catch (error) {
      logger.error(`Échec de l'envoi de la notification produit à ${this.to} : ${error.message}`);
    }
  }

  async sendPasswordUpdated() {
    await this.send('passwordUpdated', 'Votre mot de passe a été mis à jour avec succès');
  }

  async sendWelcome() {
    await this.send('welcome', 'Bienvenue chez julu-and-peer !');
  }

  async sendLogin() {
    await this.send('login', 'Connexion à votre espace personnel chez julu-and-peer !');
  }

  async renewPassword() {
    await this.send('renewPassword', 'Renouvelez votre mot de passe');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Votre jeton de réinitialisation du mot de passe (valide pendant 10 minutes)');
  }

  async confirmPasswordReset() {
    await this.send('confirmPasswordReset', 'Votre mot de passe a été réinitialisé avec succès');
  }
};