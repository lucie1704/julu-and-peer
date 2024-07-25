const cartItemController = require('../../controllers/cartItemController');
const { Product, CartItem } = require('../../models');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    Product: {
        findOne: jest.fn(),
    },
    CartItem: {
        findOne: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Tests sur le controller des cart items', () => {
    let res;

    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    it('devrait ajouter un nouveau cart item', async () => {
        const req = { body: { productId: 'product-id', cartId: 'cart-id', quantity: 1 } };
        const product = { id: 'product-id' };
        const newCartItem = { id: 'new-cart-item-id', productId: 'product-id', cartId: 'cart-id', quantity: 1 };

        Product.findOne.mockResolvedValue(product);
        CartItem.findOne.mockResolvedValue(null);
        CartItem.create.mockResolvedValue(newCartItem);

        await cartItemController.add(req, res);

        expect(Product.findOne).toHaveBeenCalledWith({ where: { id: 'product-id' } });
        expect(CartItem.findOne).toHaveBeenCalledWith({ where: { productId: 'product-id', cartId: 'cart-id' } });
        expect(CartItem.create).toHaveBeenCalledWith(expect.objectContaining({
            id: expect.any(String),
            productId: 'product-id',
            cartId: 'cart-id',
            quantity: 1
        }));
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newCartItem);
    });

    it('devrait mettre à jour un cart item existant', async () => {
        const req = { body: { productId: 'product-id', cartId: 'cart-id', quantity: 2 } };
        const product = { id: 'product-id' };
        const existingCartItem = { id: 'existing-cart-item-id', productId: 'product-id', cartId: 'cart-id', quantity: 1, save: jest.fn() };

        Product.findOne.mockResolvedValue(product);
        CartItem.findOne.mockResolvedValue(existingCartItem);

        await cartItemController.add(req, res);

        expect(Product.findOne).toHaveBeenCalledWith({ where: { id: 'product-id' } });
        expect(CartItem.findOne).toHaveBeenCalledWith({ where: { productId: 'product-id', cartId: 'cart-id' } });
        expect(existingCartItem.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(existingCartItem);
    });

    it('devrait renvoyer une erreur si le produit n\'est pas trouvé lors de l\'ajout', async () => {
        const req = { body: { productId: 'product-id', cartId: 'cart-id', quantity: 1 } };
        const next = jest.fn();

        Product.findOne.mockResolvedValue(null);

        await cartItemController.add(req, res, next);

        expect(Product.findOne).toHaveBeenCalledWith({ where: { id: 'product-id' } });
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait mettre à jour un cart item', async () => {
        const req = { body: { productId: 'product-id', cartId: 'cart-id', quantity: 2 } };
        const product = { id: 'product-id' };
        const existingCartItem = { id: 'existing-cart-item-id', productId: 'product-id', cartId: 'cart-id', quantity: 1, save: jest.fn() };

        Product.findOne.mockResolvedValue(product);
        CartItem.findOne.mockResolvedValue(existingCartItem);

        await cartItemController.update(req, res);

        expect(Product.findOne).toHaveBeenCalledWith({ where: { id: 'product-id' } });
        expect(CartItem.findOne).toHaveBeenCalledWith({ where: { productId: 'product-id', cartId: 'cart-id' } });
        expect(existingCartItem.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(existingCartItem);
    });

    it('devrait renvoyer une erreur si le produit n\'est pas trouvé lors de la mise à jour', async () => {
        const req = { body: { productId: 'product-id', cartId: 'cart-id', quantity: 2 } };
        const next = jest.fn();

        Product.findOne.mockResolvedValue(null);

        await cartItemController.update(req, res, next);

        expect(Product.findOne).toHaveBeenCalledWith({ where: { id: 'product-id' } });
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait supprimer un cart item', async () => {
        const req = { params: { id: 'cart-item-id' } };

        CartItem.destroy.mockResolvedValue(1);

        await cartItemController.delete(req, res);

        expect(CartItem.destroy).toHaveBeenCalledWith({ where: { id: 'cart-item-id' } });
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('ne devrait pas supprimer un cart item si aucun enregistrement n\'est trouvé', async () => {
        const req = { params: { id: 'cart-item-id' } };
        const next = jest.fn();

        CartItem.destroy.mockResolvedValue(0);

        await cartItemController.delete(req, res, next);

        expect(CartItem.destroy).toHaveBeenCalledWith({ where: { id: 'cart-item-id' } });
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });
});
