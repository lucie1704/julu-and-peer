const request = require("supertest");
const app = require("../../app");
const newUser = require("../mock-data/new-user.json");
const { User} = require('../../models');

const baseUrl = "/api/v1/auth";

// Mock user model
jest.mock('../../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const UserMock = dbMock.define('User',{
    name: "justindev",
    email:"jujupeerteam@gmail.com",
    role:  "admin",
    password: "Password123@",
    passwordConfirm: "Password123@"
  });

  UserMock.build = jest.fn().mockReturnValue(UserMock);
  UserMock.createEmailConfirmToken = jest.fn().mockReturnValue('mockedToken');
  UserMock.save = jest.fn().mockResolvedValue(UserMock);
  
  UserMock.findOne = jest.fn().mockResolvedValue(UserMock)

  return {
    User: UserMock
  };
});

describe(baseUrl, () => {
  it(`POST ${baseUrl}/signup`, async () => {

    const response = await request(app)
      .post(`${baseUrl}/signup`)
      .send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });
});
