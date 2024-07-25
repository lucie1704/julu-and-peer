const customerAddressController = require('../../controllers/customerAddressController');
const { CustomerAddress, Customer } = require('../../models');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    CustomerAddress: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
    Customer: {
        findByPk: jest.fn(),
    },
}));

describe('Tests sur le controller des adresses des clients', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer une nouvelle adresse pour un client', async () => {
        const req = {
            body: {
                customerId: 'customer-id',
                street: '123 Rue Exemple',
                city: 'Ville',
                postalCode: '12345',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const customer = { id: 'customer-id' };
        const newAddress = { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a', ...req.body };

        Customer.findByPk.mockResolvedValue(customer);
        CustomerAddress.create.mockResolvedValue(newAddress);

        await customerAddressController.create(req, res);

        expect(Customer.findByPk).toHaveBeenCalledWith('customer-id');
        expect(CustomerAddress.create).toHaveBeenCalledWith({ id: expect.any(String), ...req.body });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newAddress);
    });

    it('devrait obtenir toutes les adresses des clients', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const addresses = [
            { id: '04caec53-e49f-4574-af49-36766bdf52c9', street: '123 Rue Test', city: 'Ville', postalCode: '12345' },
            { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a', street: '456 Rue Test', city: 'Ville', postalCode: '67890' }
        ];

        CustomerAddress.findAll.mockResolvedValue(addresses);

        await customerAddressController.getAll(req, res);

        expect(CustomerAddress.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(addresses);
    });

    it('devrait obtenir une adresse par UUID', async () => {
        const req = { params: { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const address = { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a', street: '123 Rue Exemple', city: 'Ville', postalCode: '12345' };

        CustomerAddress.findByPk.mockResolvedValue(address);

        await customerAddressController.getById(req, res);

        expect(CustomerAddress.findByPk).toHaveBeenCalledWith('5afe9032-4b52-4d1e-9d25-d7d4795aef9a');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(address);
    });

    it('devrait mettre à jour une adresse', async () => {
        const req = { params: { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a' }, body: { street: '789 Rue Modifiée' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const updatedAddress = { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a', street: '789 Rue Modifiée' };
        
        CustomerAddress.update.mockResolvedValue([1, [updatedAddress]]);

        await customerAddressController.update(req, res);

        expect(CustomerAddress.update).toHaveBeenCalledWith(req.body, {
            where: { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a' },
            returning: true,
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedAddress);
    });

    it('devrait supprimer une adresse', async () => {
        const req = { params: { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        CustomerAddress.destroy.mockResolvedValue(1);

        await customerAddressController.delete(req, res);

        expect(CustomerAddress.destroy).toHaveBeenCalledWith({
            where: { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a' },
        });
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('ne devrait pas supprimer une adresse si elle n\'existe pas', async () => {
        const req = { params: { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        CustomerAddress.destroy.mockResolvedValue(0);
        const next = jest.fn();

        await customerAddressController.delete(req, res, next);

        expect(CustomerAddress.destroy).toHaveBeenCalledWith({
            where: { id: '5afe9032-4b52-4d1e-9d25-d7d4795aef9a' },
        });
        expect(next).toHaveBeenCalledWith(new AppError(404));
    });
});
