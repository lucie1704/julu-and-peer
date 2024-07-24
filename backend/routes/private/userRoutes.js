const express = require('express');
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


router.use(authMiddleware);

router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router
  .route('/:id')
  .get(userController.get)
  .patch(userController.update)
  .delete(userController.delete);
  
router.use(autorizationMiddleware('admin'));

  router
    .route('/')
    .post(userController.create)
    .get(userController.getAll)

module.exports = router;