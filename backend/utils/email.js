const nodemailer = require('nodemailer');
const pug = require('pug');
const {convert} = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstname;
    this.url = url;
    this.from = `${process.env.USERNAME} <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
        return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // if (process.env.NODE_ENV === 'production') {
      // await this.newTransport().sendMail(mailOptions);
    // }
  }
  
  async sendPasswordUpdated() {
    await this.send(
      'passwordUpdated',
      'Your password has been updated successfully'
    );
  }

  async sendWelcome() {
    await this.send(
    'welcome',
    'Bienvenue chez Julu&Peer !'
    );
  }

  async renewPassword() {
    await this.send("Renew password");
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async confirmPasswordReset() {
    await this.send(
      'confirmPasswordReset',
      'Your password has been reset successfully'
    );
  }

};