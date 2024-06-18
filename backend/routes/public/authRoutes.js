const express = require('express');
const authController = require('../../controllers/authController');

const router = express.Router();
// Public routes
router.post('/signup', authController.signup);
router.patch('/confirmEmail/:token', authController.emailConfirm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotMyPassword);
router.patch('/resetPassword/:token', authController.resetMyPassword);

module.exports = router;