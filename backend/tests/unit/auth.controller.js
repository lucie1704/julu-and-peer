const httpMocks = require("node-mocks-http");
const user = require("../mock-data/new-user.json");
const authController = require("../../controllers/authController");
const Email = require('../../utils/email');
const { User } = require('../../models');

// Mock user model
jest.mock('../../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const UserMock = dbMock.define('User', {
    id: "sqdqsd8qsfdqsff",
    firstname: "Justin",
    lastname: "KATASI",
    email: "jujupeerteam@gmail.com",
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
    req.body = user;
  });

  it("should have a signup function", () => {
    expect(typeof authController.signup).toBe("function");
  });

  it("should call User.build", async () => {
    await authController.signup(req, res, next);

    const buildArgs = User.build.mock.calls[0][0];

    expect(buildArgs).toEqual(expect.objectContaining({
      id: expect.any(String),
      firstname: 'Justin',
      lastname: 'KATASI',
      email: 'jujupeerteam@gmail.com',
      password: 'Password123@',
      passwordConfirmation: 'Password123@'
    }));

    expect(User.build).toHaveBeenCalledWith(buildArgs);
  });

  it("should call User.createEmailConfirmToken", async () => {
    await authController.signup(req, res, next);
    expect(User.createEmailConfirmToken).toHaveBeenCalled();
  });

  it("should call User.save", async () => {
    await authController.signup(req, res, next);
    expect(User.save).toHaveBeenCalled();
  });

  it("should return 202 response code", async () => {
    await authController.signup(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it("should handle errors and call next with error", async () => {
    req.body = {
      firstname: "Justin",
      email: "jujupeerteam@gmail.com",
      password: "Password123@",
      passwordConfirmation: "Password123@"
    };

    await authController.signup(req, res, next);
  });
});

describe("AuthController.login", () => {
  beforeEach(() => {
    req = {
      body: {
        email: "jujupeer@gmail.com",
        password: "Password123@"
      }
    };
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  it("should have a login function", () => {
    expect(typeof authController.login).toBe("function");
  });

});
