const db = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { uuidv7 } = require('uuidv7');
const dotenv = require('dotenv');
// const { signup, emailConfirm, login, forgotMyPassword, resetMyPassword, updateMyPassword, getAllUsers, getUserById, deleteUser } = require('../../controllers/authController');
const authController = require("../../controllers/authController");


jest.mock('../../models');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');
jest.mock('crypto', () => ({
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue('randomToken')
  }),
  createHash: jest.fn().mockReturnValue({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnValue('hashedToken')
  })
}));

describe('User Controller Tests', () => {
  let mockTransporter;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTransporter = {
      sendMail: jest.fn().mockImplementation((mailOptions, callback) => {
        callback(null, { response: 'Simulated success response' });
      }),
    };
    nodemailer.createTransport.mockReturnValue(mockTransporter);
  });

  describe('signup', () => {
    it('should register a new user', async () => {
      db.User.count.mockResolvedValue(0);
      bcrypt.hash.mockResolvedValue('hashedPassword');

      db.User.create.mockResolvedValue({
        id: "0190e6c8-19c3-73f1-bb01-39a8056658ee",
        firstname: "Justin",
        lastname: "KATASI",
        email:"jujupeerteam@gmail.com",
        password: "Password123@",
        passwordConfirmation: "Password123@"
      });

      const req = { body: { firstname: 'Justin', lastname: 'KATASI', email: 'jujupeerteam@gmail.com', password: 'Password123@', passwordConfirmation: 'Password123@' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      // Mock createEmailConfirmToken
      
      const result  = await authController.signup(req, res);

      expect(db.User.count).toHaveBeenCalledWith({ where: { email: 'john.doe@example.com' } });
    //   expect(bcrypt.hash).toHaveBeenCalledWith('ValidPass123!', 12);
    //   expect(db.User.create).toHaveBeenCalled();
    //   expect(mockTransporter.sendMail).toHaveBeenCalled();
    //   expect(res.status).toHaveBeenCalledWith(202);
    //   expect(res.send).toHaveBeenCalled();
    // });

    // it('should throw an error if email already exists', async () => {
    //   db.User.count.mockResolvedValue(1);

    //   const req = { body: { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', password: 'ValidPass123!', passwordConfirmation: 'ValidPass123!' } };
    //   const res = {};
    //   const next = jest.fn();

    //   await signup(req, res, next);

    //   expect(next).toHaveBeenCalledWith(expect.any(Error));
    // });
  });

  // describe('login', () => {
  //   it('should log in a user with correct password', async () => {
  //     const user = {
  //       id: 1,
  //       password: 'hashedPassword',
  //       correctPassword: jest.fn().mockResolvedValue(true),
  //       save: jest.fn()
  //     };
  //     db.User.findOne.mockResolvedValue(user);
  //     jwt.sign.mockReturnValue('jwtToken');

  //     const req = { body: { email: 'john.doe@example.com', password: 'ValidPass123!' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     const next = jest.fn();

  //     await login(req, res, next);

  //     expect(jwt.sign).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith('jwtToken');
  //   });

  //   it('should throw an error if password is incorrect', async () => {
  //     const user = {
  //       id: 1,
  //       password: 'hashedPassword',
  //       correctPassword: jest.fn().mockResolvedValue(false),
  //       save: jest.fn()
  //     };
  //     db.User.findOne.mockResolvedValue(user);

  //     const req = { body: { email: 'john.doe@example.com', password: 'InvalidPass' } };
  //     const res = {};
  //     const next = jest.fn();

  //     await login(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expect.any(Error));
  //   });
  // });

  // describe('emailConfirm', () => {
  //   it('should confirm email if token is valid', async () => {
  //     const user = {
  //       emailConfirmToken: 'hashedToken',
  //       emailConfirmExpires: new Date(Date.now() + 3600000),
  //       emailConfirmed: false,
  //       save: jest.fn()
  //     };
  //     db.User.findOne.mockResolvedValue(user);

  //     const req = { params: { token: 'validToken' } };
  //     const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  //     const next = jest.fn();

  //     await emailConfirm(req, res, next);

  //     expect(user.save).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.send).toHaveBeenCalled();
  //   });

  //   it('should throw an error if token is invalid or expired', async () => {
  //     const user = {
  //       emailConfirmToken: 'hashedToken',
  //       emailConfirmExpires: new Date(Date.now() - 3600000),
  //       emailConfirmed: false,
  //       save: jest.fn()
  //     };
  //     db.User.findOne.mockResolvedValue(user);

  //     const req = { params: { token: 'invalidToken' } };
  //     const res = {};
  //     const next = jest.fn();

  //     await emailConfirm(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expect.any(Error));
  //   });
  // });

  // describe('forgotMyPassword', () => {
  //   it('should send a password reset email if user exists', async () => {
  //     const user = {
  //       createPasswordResetToken: jest.fn().mockReturnValue('resetToken'),
  //       save: jest.fn()
  //     };
  //     db.User.findOne.mockResolvedValue(user);

  //     const req = { body: { email: 'john.doe@example.com' } };
  //     const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  //     const next = jest.fn();

  //     await forgotMyPassword(req, res, next);

  //     expect(user.createPasswordResetToken).toHaveBeenCalled();
  //     expect(user.save).toHaveBeenCalled();
  //     expect(mockTransporter.sendMail).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(202);
  //     expect(res.send).toHaveBeenCalled();
  //   });

  //   it('should throw an error if user does not exist', async () => {
  //     db.User.findOne.mockResolvedValue(null);

  //     const req = { body: { email: 'john.doe@example.com' } };
  //     const res = {};
  //     const next = jest.fn();

  //     await forgotMyPassword(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expect.any(Error));
  //   });
  // });

  // describe('resetMyPassword', () => {
  //   it('should reset the password if token is valid', async () => {
  //     const user = {
  //       passwordResetToken: 'hashedToken',
  //       passwordResetExpires: new Date(Date.now() + 3600000),
  //       save: jest.fn()
  //     };
  //     db.User.findOne.mockResolvedValue(user);

  //     const req = { params: { token: 'validToken' }, body: { password: 'newPassword123', passwordConfirmation: 'newPassword123' } };
  //     const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  //     const next = jest.fn();

  //     await resetMyPassword(req, res, next);

  //     expect(user.save).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.send).toHaveBeenCalled();
  //   });

  //   it('should throw an error if token is invalid or expired', async () => {
  //     const user = {
  //       passwordResetToken: 'hashedToken',
  //       passwordResetExpires: new Date(Date.now() - 3600000),
  //       save: jest.fn()
  //     };
  //     db.User.findOne.mockResolvedValue(user);

  //     const req = { params: { token: 'invalidToken' }, body: { password: 'newPassword123', passwordConfirmation: 'newPassword123' } };
  //     const res = {};
  //     const next = jest.fn();

  //     await resetMyPassword(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expect.any(Error));
  //   });
  // });

  // describe('getAllUsers', () => {
  //   it('should retrieve all users', async () => {
  //     const mockUsers = [
  //       { id: 1, name: 'John Doe', deleted: false },
  //       { id: 2, name: 'Jane Doe', deleted: false }
  //     ];

  //     db.User.findAll.mockResolvedValue(mockUsers);

  //     const req = {};
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     const next = jest.fn();

  //     await getAllUsers(req, res, next);

  //     expect(db.User.findAll).toHaveBeenCalledWith({ where: { deleted: false } });
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith(mockUsers);
  //   });

  //   it('should handle error when retrieving users', async () => {
  //     db.User.findAll.mockRejectedValue(new Error('Database error'));

  //     const req = {};
  //     const res = {};
  //     const next = jest.fn();

  //     await getAllUsers(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expect.any(Error));
  //   });
  // });

  // describe('getUserById', () => {
  //   it('should retrieve user by ID', async () => {
  //     const mockUser = { id: 1, name: 'John Doe', deleted: false };

  //     db.User.findOne.mockResolvedValue(mockUser);

  //     const req = { params: { id: 1 } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     const next = jest.fn();

  //     await getUserById(req, res, next);

  //     expect(db.User.findOne).toHaveBeenCalledWith({ where: { id: 1, deleted: false } });
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith(mockUser);
  //   });

  //   it('should handle error when user is not found', async () => {
  //     db.User.findOne.mockResolvedValue(null);

  //     const req = { params: { id: 1 } };
  //     const res = {};
  //     const next = jest.fn();

  //     await getUserById(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expect.any(Error));
  //   });
  // });

  // describe('deleteUser', () => {
  //   it('should delete user by ID', async () => {
  //     const mockUser = { id: 1, name: 'John Doe', deleted: false, save: jest.fn() };

  //     db.User.findOne.mockResolvedValue(mockUser);

  //     const req = { params: { id: 1 } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     const next = jest.fn();

  //     await deleteUser(req, res, next);

  //     expect(db.User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  //     expect(mockUser.save).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(204);
  //     expect(res.json).toHaveBeenCalled();
  //   });

  //   it('should handle error when user is not found', async () => {
  //     db.User.findOne.mockResolvedValue(null);

  //     const req = { params: { id: 1 } };
  //     const res = {};
  //     const next = jest.fn();

  //     await deleteUser(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expect.any(Error));
  //   });
  });
});