const wishlistController = require('../../controllers/wishlistController');
const { Wishlist } = require('../../models');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    Wishlist: {
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Tests sur le controller des wishlists', () => {
    let res;

    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    it('devrait créer une nouvelle wishlist', async () => {
        const req = { body: { slug: 'product-slug', productId: 'product-id' } };
        const existingWishlist = null;
        const newWishlist = { id: 'new-id', ...req.body };

        Wishlist.findOne.mockResolvedValue(existingWishlist);
        Wishlist.create.mockResolvedValue(newWishlist);

        await wishlistController.create(req, res);

        expect(Wishlist.findOne).toHaveBeenCalledWith({ where: { slug: 'product-slug', productId: 'product-id' } });
        expect(Wishlist.create).toHaveBeenCalledWith({ id: expect.any(String), ...req.body });
        expect(res.json).toHaveBeenCalledWith(newWishlist);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('ne devrait pas créer une wishlist si elle existe déjà', async () => {
        const req = { body: { slug: 'product-slug', productId: 'product-id' } };
        const existingWishlist = { id: 'existing-id' };
        const next = jest.fn();

        Wishlist.findOne.mockResolvedValue(existingWishlist);

        await wishlistController.create(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(409);
    });

    it('devrait obtenir toutes les wishlists pour un client', async () => {
        const req = { params: { id: 'customer-id' } };
        const wishlists = [{ id: '1', slug: 'product-slug', productId: 'product-id' }, { id: '2', slug: 'product-slug2', productId: 'product-id2' }];
        Wishlist.findAll.mockResolvedValue(wishlists);

        await wishlistController.getAll(req, res);

        expect(Wishlist.findAll).toHaveBeenCalledWith({ where: { customerId: 'customer-id' } });
        expect(res.json).toHaveBeenCalledWith({ ...wishlists, wishlistCount: 2 });
    });

    it('ne devrait pas obtenir des wishlists si aucune n\'est trouvée', async () => {
        const req = { params: { id: 'customer-id' } };
        const next = jest.fn();
        Wishlist.findAll.mockResolvedValue([]);

        await wishlistController.getAll(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait obtenir une wishlist par ID', async () => {
        const req = { params: { id: 'wishlist-id' } };
        const wishlist = { id: 'wishlist-id', slug: 'product-slug', productId: 'product-id' };
        Wishlist.findByPk.mockResolvedValue(wishlist);

        await wishlistController.getById(req, res);

        expect(Wishlist.findByPk).toHaveBeenCalledWith('wishlist-id');
        expect(res.json).toHaveBeenCalledWith(wishlist);
    });

    it('ne devrait pas obtenir une wishlist si elle n\'existe pas', async () => {
        const req = { params: { id: 'wishlist-id' } };
        const next = jest.fn();
        Wishlist.findByPk.mockResolvedValue(null);

        await wishlistController.getById(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait mettre à jour une wishlist', async () => {
        const req = { params: { id: 'wishlist-id' }, body: { slug: 'updated-slug' } };
        const [nbUpdated] = [1];
        const updatedWishlist = { id: 'wishlist-id', slug: 'updated-slug', productId: 'product-id' };

        Wishlist.update.mockResolvedValue([nbUpdated]);
        Wishlist.findByPk.mockResolvedValue(updatedWishlist);

        await wishlistController.update(req, res);

        expect(Wishlist.update).toHaveBeenCalledWith(req.body, { where: { id: 'wishlist-id' }, returning: true });
        expect(Wishlist.findByPk).toHaveBeenCalledWith('wishlist-id');
        expect(res.json).toHaveBeenCalledWith(updatedWishlist);
    });

    it('ne devrait pas mettre à jour une wishlist si aucun enregistrement trouvé', async () => {
        const req = { params: { id: 'wishlist-id' }, body: { slug: 'updated-slug' } };
        const next = jest.fn();
        Wishlist.update.mockResolvedValue([0]);

        await wishlistController.update(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it('devrait supprimer une wishlist', async () => {
        const req = { params: { id: 'wishlist-id' } };
        Wishlist.destroy.mockResolvedValue(1);

        await wishlistController.delete(req, res);

        expect(Wishlist.destroy).toHaveBeenCalledWith({ where: { id: 'wishlist-id' } });
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('ne devrait pas supprimer une wishlist si aucun enregistrement trouvé', async () => {
        const req = { params: { id: 'wishlist-id' } };
        const next = jest.fn();
        Wishlist.destroy.mockResolvedValue(0);

        await wishlistController.delete(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });
});
