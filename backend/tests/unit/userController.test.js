const userController = require('../../controllers/userController');
const { User } = require('../../models');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    User: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn(),
        findOne: jest.fn(),
        findAndCountAll: jest.fn(),
    },
}));

describe('User Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    it('should create a new user', async () => {
        req.body = { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', password: 'password', passwordConfirmation: 'password' };
        const newUser = { id: 1, ...req.body };
        User.create.mockResolvedValue(newUser);

        await userController.create(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(newUser);
    });

    it('should get all users', async () => {
        req.query = { page: 1 };
        const users = [{ id: 1, firstname: 'John', lastname: 'Doe' }];
        User.findAndCountAll.mockResolvedValue({ count: 1, rows: users });

        await userController.getAll(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            page: 1,
            limit: 20,
            totalItems: 1,
            totalPages: 1,
            data: users
        });
    });

    it('should get a user by id', async () => {
        req.params = { id: 1 };
        const user = { id: 1, firstname: 'John', lastname: 'Doe' };
        User.findByPk.mockResolvedValue(user);

        await userController.get(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should return 404 if user not found', async () => {
        req.params = { id: 1 };
        User.findByPk.mockResolvedValue(null);

        await userController.get(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('should delete a user', async () => {
      const user = { id: 1, firstname: 'John', lastname: 'Doe' };
      req.params = { id: user.id };
      User.findOne.mockResolvedValue(user);
      User.destroy.mockResolvedValue(1);

      await userController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if user to delete not found', async () => {
        req.params = { id: 1 };
        User.findOne.mockResolvedValue(null);

        await userController.delete(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('should update a user', async () => {
        req.params = { id: 1 };
        req.body = { firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com' };
        const updatedUser = { id: 1, firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com' };
        User.update.mockResolvedValue([1, [updatedUser]]);

        await userController.update(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should return 404 if user to update return error bc trying to change password', async () => {
        req.params = { id: 1 };
        req.body = { firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com', password: "testMdp123@" };
        User.update.mockResolvedValue([0, []]);

        await userController.update(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
});
