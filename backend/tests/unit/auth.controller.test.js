const httpMocks = require("node-mocks-http");
const adminUser = require("../mock-data/new-user.json");
const authController = require("../../controllers/authController");
const Email = require('../../utils/email');
const { User} = require('../../models');

// Mock user model
jest.mock('../../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const UserMock = dbMock.define('User', {
    firstname: "Justin",
    lastname: "KATASI",
    email:"jujupeerteam@gmail.com",
    role:  "admin",
    password: "Password123@",
    passwordConfirm: "Password123@"
  });

  UserMock.build = jest.fn().mockReturnValue(UserMock);
  UserMock.createEmailConfirmToken = jest.fn().mockReturnValue('mockedToken');
  UserMock.save = jest.fn().mockResolvedValue(UserMock);

  return {
    User: UserMock
  };
});

// Mock Email class
jest.mock('../../utils/email', () => {
  return jest.fn().mockImplementation(() => {
    return {
      sendWelcome: jest.fn().mockResolvedValue(true)
    };
  });
});

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("AuthController.signup", () => {
  beforeEach(() => {
    req.body = adminUser;
  });

  it("should have a signup function", () => {
    expect(typeof authController.signup).toBe("function");
  });

  it("should call User.build", async() => {
    await authController.signup(req, res, next);
    expect(User.build).toHaveBeenCalledWith(adminUser);
  });

  it("should call User.createEmailConfirmToken", async() => {
    await authController.signup(req, res, next);
    expect(User.createEmailConfirmToken).toHaveBeenCalled();
  });

  it("should call User.save", async() => {
    await authController.signup(req, res, next);
    expect(User.save).toHaveBeenCalled();
  });
  it("should return 201 response code", async () => {
    await authController.signup(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});


describe("AuthController.login", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: "jujupeer@gmail.com",
        password: "Password123@"
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it("should have a login function", () => {
    expect(typeof authController.login).toBe("function");
  });

});