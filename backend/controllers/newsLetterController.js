const catchAsyncError = require('../utils/catchAsyncError');
const {User, Customer} = require('../models');
const ProductEmail = require('../utils/productEmail');

exports.newsletter = catchAsyncError(async (req, res, next) => {

  const users =  await User.findAll({ where: { newsletterSubscribed: true } });

  async function sendNewsletter() {

    const emailPromises = users.map(async (user) => {
        const email = new ProductEmail(user, `www.juluandpeer.store/newsletter`);

        await email.newsProduct();
        await email.discountedProduct();
    });

    await Promise.all(emailPromises);
  }

    await sendNewsletter();

    res.status(200).json();
});
