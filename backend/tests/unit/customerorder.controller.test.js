const customerOrderController = require('../../controllers/customerOrder');
const { CustomerOrder, Customer, CustomerAddress } = require('../../models');

jest.mock('../../models', () => ({
    CustomerOrder: {
        create: jest.fn(),
        findByPk: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        findAndCountAll: jest.fn(),
    },
    Customer: {
        findByPk: jest.fn(),
    },
    CustomerAddress: {
        findAll: jest.fn(),
    },
}));

describe('Tests sur le controller des commandes des clients', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait vérifier le paiement et mettre à jour le statut de livraison', async () => {
        const req = { params: { id: 'order-id' } };
        const res = {};
        const next = jest.fn();

        const customerOrder = { 
            id: 'order-id', 
            paymentStatus: 'unpaid', 
            update: jest.fn() 
        };
        const updatedOrder = { ...customerOrder, deliveryStatus: 'cancelled' };

        CustomerOrder.findByPk.mockResolvedValue(customerOrder);
        customerOrder.update.mockResolvedValue(updatedOrder);

        const result = await customerOrderController.paymentCheck(req.params.id);

        expect(CustomerOrder.findByPk).toHaveBeenCalledWith('order-id');
        expect(customerOrder.update).toHaveBeenCalledWith({ deliveryStatus: 'cancelled' });
        expect(result).toBe(true);
    });

    it('devrait confirmer une commande', async () => {
        const req = { params: { id: 'order-id' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const next = jest.fn();

        const customerOrder = {
            id: 'order-id',
            update: jest.fn(),
        };
        const updatedOrder = { 
            ...customerOrder, 
            paymentStatus: 'paid', 
            deliveryStatus: 'pending' 
        };

        CustomerOrder.findByPk.mockResolvedValue(customerOrder);
        customerOrder.update.mockResolvedValue(updatedOrder);

        await customerOrderController.orderConfirm(req, res, next);

        expect(CustomerOrder.findByPk).toHaveBeenCalledWith('order-id');
        expect(customerOrder.update).toHaveBeenCalledWith({ paymentStatus: 'paid', deliveryStatus: 'pending' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
    });

    it('devrait créer une nouvelle commande', async () => {
        const req = {
            body: {
                shippingFee: 10,
                products: [
                    { id: 'product-1', name: 'Product 1', description: 'Desc 1', price: 20, quantity: 2 },
                ],
                shippingInfo: '123 Shipping St.',
                customerId: 'customer-id',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const next = jest.fn();

        const customer = { id: 'customer-id' };
        const existingOrder = null;
        const newOrder = {
            id: 'order-id',
            customerId: 'customer-id',
            shippingInfo: '123 Shipping St.',
            products: req.body.products,
            price: 50,
            paymentStatus: 'unpaid',
            deliveryStatus: 'pending',
            date: expect.any(Date),
        };

        Customer.findByPk.mockResolvedValue(customer);
        CustomerOrder.findOne.mockResolvedValue(existingOrder);
        CustomerOrder.create.mockResolvedValue(newOrder);
        jest.spyOn(customerOrderController, 'paymentCheck').mockResolvedValue(true);

        await customerOrderController.create(req, res, next);

        expect(Customer.findByPk).toHaveBeenCalledWith('customer-id');
        expect(CustomerOrder.findOne).toHaveBeenCalledWith({
            where: {
                customerId: 'customer-id',
                deliveryStatus: 'pending',
                paymentStatus: 'unpaid',
            },
        });
        expect(CustomerOrder.create).toHaveBeenCalledWith(expect.objectContaining({
            id: expect.any(String),
            customerId: 'customer-id',
            shippingInfo: '123 Shipping St.',
            products: req.body.products,
            price: 50,
            paymentStatus: 'unpaid',
            deliveryStatus: 'pending',
        }));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
    });

    it('devrait obtenir toutes les commandes d\'un client', async () => {
        const req = { params: { id: 'customer-id', status: 'pending' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        const orders = [
            { id: 'order-id-1', deliveryStatus: 'pending' },
            { id: 'order-id-2', deliveryStatus: 'pending' },
        ];

        CustomerOrder.findAll.mockResolvedValue(orders);

        await customerOrderController.getAll(req, res, next);

        expect(CustomerOrder.findAll).toHaveBeenCalledWith({
            where: {
                customerId: 'customer-id',
                deliveryStatus: 'pending',
            },
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(orders);
    });

    it('devrait obtenir une commande par ID', async () => {
        const req = { params: { orderId: 'order-id' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        const order = { id: 'order-id', deliveryStatus: 'pending' };

        CustomerOrder.findByPk.mockResolvedValue(order);

        await customerOrderController.getById(req, res, next);

        expect(CustomerOrder.findByPk).toHaveBeenCalledWith('order-id');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(order);
    });

    it('devrait obtenir toutes les commandes avec pagination pour les admins', async () => {
        const req = { query: { page: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const orders = [
            { id: 'order-id-1', deliveryStatus: 'pending' },
            { id: 'order-id-2', deliveryStatus: 'shipped' },
        ];
        const count = orders.length;
        const totalPages = Math.ceil(count / 20);

        CustomerOrder.findAndCountAll.mockResolvedValue({ count, rows: orders });

        await customerOrderController.getAllOrders(req, res);

        expect(CustomerOrder.findAndCountAll).toHaveBeenCalledWith({
            limit: 20,
            offset: 0,
            include: [{ model: Customer }],
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            page: 1,
            limit: 20,
            totalItems: count,
            totalPages,
            data: orders,
        });
    });

    it('devrait obtenir les adresses des clients pour l\'option', async () => {
        const req = { user: { id: 'customer-id' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const addresses = [
            { id: 'address-id-1', street: '123 Main St' },
            { id: 'address-id-2', street: '456 Elm St' },
        ];

        CustomerAddress.findAll.mockResolvedValue(addresses);

        await customerOrderController.options(req, res);

        expect(CustomerAddress.findAll).toHaveBeenCalledWith({
            where: {
                customerId: 'customer-id',
            },
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ adress: addresses });
    });
});
