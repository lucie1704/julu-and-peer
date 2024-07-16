const express = require('express');
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware);

// User role
router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);


//Need admin role to get access to these routes
router.use(autorizationMiddleware('admin'));

router
  .route('/')
  .get(userController.getAllUsers)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
  

module.exports = router;