const cartController = require('../../controllers/cartController');
const { Cart, CartItem, Product, ProductGenre, ProductFormat, ProductArtist, Image } = require('../../models');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    Cart: {
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
    CartItem: jest.fn(),
    Product: jest.fn(),
    ProductGenre: jest.fn(),
    ProductFormat: jest.fn(),
    ProductArtist: jest.fn(),
    Image: jest.fn(),
}));

describe('Tests sur le controller des carts', () => {
    let res;

    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    it('devrait obtenir les produits d\'un cart', async () => {
        const req = { params: { id: 'customer-id' } };
        const cart = {
            CartItems: [
                {
                    quantity: 1,
                    Product: { id: 'product-id', price: 10, discount: 1, quantity: 10 }
                }
            ]
        };
        Cart.findOne.mockResolvedValue(cart);

        await cartController.getProducts(req, res);

        expect(Cart.findOne).toHaveBeenCalledWith({
            where: { customerId: 'customer-id' },
            include: {
                model: CartItem,
                include: [
                    { model: Product, include: [{ model: ProductGenre }, { model: ProductFormat }, { model: ProductArtist }, { model: Image }] }
                ]
            }
        });

        expect(res.json).toHaveBeenCalledWith({
            cart,
            totalPrice: 10,
            totalDiscount: 1,
            cartTotalProductCount: 1,
            shippingFee: 50,
            outOfStockProducts: [],
            availableProducts: cart.CartItems
        });
    });

    it('devrait obtenir tous les carts', async () => {
        const req = {};
        const carts = [{ id: 'cart-id1' }, { id: 'cart-id2' }];
        Cart.findAll.mockResolvedValue(carts);

        await cartController.getAll(req, res);

        expect(Cart.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(carts);
    });

    it('ne devrait pas obtenir de carts s\'ils n\'existent pas', async () => {
        const req = {};
        const next = jest.fn();
        Cart.findAll.mockResolvedValue([]);

        await cartController.getAll(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait obtenir un cart par ID', async () => {
        const req = { params: { id: 'cart-id' } };
        const cart = { id: 'cart-id' };
        Cart.findByPk.mockResolvedValue(cart);

        await cartController.getById(req, res);

        expect(Cart.findByPk).toHaveBeenCalledWith('cart-id');
        expect(res.json).toHaveBeenCalledWith(cart);
    });

    it('ne devrait pas obtenir un cart par ID s\'il n\'existe pas', async () => {
        const req = { params: { id: 'cart-id' } };
        const next = jest.fn();
        Cart.findByPk.mockResolvedValue(null);

        await cartController.getById(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait obtenir un cart par customer ID', async () => {
        const req = { params: { id: 'customer-id' } };
        const cart = { id: 'cart-id', customerId: 'customer-id' };
        Cart.findOne.mockResolvedValue(cart);

        await cartController.getByCustomerId(req, res);

        expect(Cart.findOne).toHaveBeenCalledWith({ where: { customerId: 'customer-id' } });
        expect(res.json).toHaveBeenCalledWith(cart);
    });

    it('ne devrait pas obtenir un cart par customer ID s\'il n\'existe pas', async () => {
        const req = { params: { id: 'customer-id' } };
        const next = jest.fn();
        Cart.findOne.mockResolvedValue(null);

        await cartController.getByCustomerId(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait créer un nouveau cart', async () => {
        const req = { body: { customerId: 'customer-id' } };
        const newCart = { id: 'new-cart-id', customerId: 'customer-id' };
        Cart.findOne.mockResolvedValue(null);
        Cart.create.mockResolvedValue(newCart);

        await cartController.create(req, res);

        expect(Cart.findOne).toHaveBeenCalledWith({ where: { customerId: 'customer-id' } });
        expect(Cart.create).toHaveBeenCalledWith({ id: expect.any(String), customerId: 'customer-id' });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newCart);
    });

    it('ne devrait pas créer un cart si un cart existe déjà pour le client', async () => {
        const req = { body: { customerId: 'customer-id' } };
        const existingCart = { id: 'existing-cart-id', customerId: 'customer-id' };
        const next = jest.fn();
        Cart.findOne.mockResolvedValue(existingCart);

        await cartController.create(req, res, next);

        expect(Cart.findOne).toHaveBeenCalledWith({ where: { customerId: 'customer-id' } });
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(409);
    });

    it('devrait mettre à jour un cart', async () => {
        const req = { params: { id: 'cart-id' }, body: { customerId: 'updated-customer-id' } };
        const updatedCart = { id: 'cart-id', customerId: 'updated-customer-id' };
        Cart.update.mockResolvedValue([1, [updatedCart]]);

        await cartController.update(req, res);

        expect(Cart.update).toHaveBeenCalledWith(req.body, { where: { id: 'cart-id' }, returning: true });
        expect(res.json).toHaveBeenCalledWith(updatedCart);
    });

    it('ne devrait pas mettre à jour un cart si aucun enregistrement n\'est trouvé', async () => {
        const req = { params: { id: 'cart-id' }, body: { customerId: 'updated-customer-id' } };
        const next = jest.fn();
        Cart.update.mockResolvedValue([0]);

        await cartController.update(req, res, next);

        expect(Cart.update).toHaveBeenCalledWith(req.body, { where: { id: 'cart-id' }, returning: true });
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait supprimer un cart', async () => {
        const req = { params: { id: 'cart-id' } };
        Cart.destroy.mockResolvedValue(1);

        await cartController.delete(req, res);

        expect(Cart.destroy).toHaveBeenCalledWith({ where: { id: 'cart-id' } });
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('ne devrait pas supprimer un cart si aucun enregistrement n\'est trouvé', async () => {
        const req = { params: { id: 'cart-id' } };
        const next = jest.fn();
        Cart.destroy.mockResolvedValue(0);

        await cartController.delete(req, res, next);

        expect(Cart.destroy).toHaveBeenCalledWith({ where: { id: 'cart-id' } });
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });
});
