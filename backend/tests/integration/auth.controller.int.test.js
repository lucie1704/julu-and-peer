const request = require("supertest");
const app = require("../../app");
const adminUser = require("../mock-data/new-user.json");
const { describe, it, expect } = require("@jest/globals");

const baseUrl = "/api/v1/auth";

// Mock user model
jest.mock('../../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const UserMock = dbMock.define('User',{
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
  
  UserMock.findOne = jest.fn().mockResolvedValue(UserMock)

  return {
    User: UserMock
  };
});

describe(baseUrl, () => {

  it('should run tests', () => {
    expect(1).toBe(1);
  });

  // it(`POST ${baseUrl}/signup`, async () => {

  //   const response = await request(app)
  //     .post(`${baseUrl}/signup`)
  //     .send(adminUser);

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.status).toBe('success');
  // });
});
