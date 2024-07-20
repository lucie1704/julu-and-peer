const ProductMongo = require("../../models/mongo/product");

module.exports = async function denormalizeProduct(product, models) {
    const Product = models.Product;

    const productDenormalized = await Product.findByPk(product.id, {
        attributes: [
            "id",
            "name",
            "description",
            "price",
            "quantity",
            "reviewCount"
        ],
        include: [
            { 
                model: models.ProductGenre, 
                attributes: ["id", "name", "description"],
                order: [["updatedAt", "DESC"]],
            },
            { 
                model: models.ProductFormat, 
                attributes: ["id", "name", "description"],
                order: [["updatedAt", "DESC"]],
            },
            { 
                model: models.ProductArtist, 
                attributes: ["id", "name", "description"],
                order: [["updatedAt", "DESC"]],
            },
            { 
                model: models.ProductCustomerEvaluation, 
                attributes: ["id", "rating", "comment"],
                order: [["updatedAt", "DESC"]],
                include: [
                    {
                        model: models.Customer,
                        attributes: ['id', 'firstName', 'lastName']
                    }
                ]
            },
            {
                model: models.Stock,
                attributes: ["type", "quantity"],
                order: [["updatedAt", "DESC"]],
            },
            {
                model: models.Image,
                attributes: ["width", "height", "type", "description", "alt", "path"],
                order: [["updatedAt", "DESC"]],
            }
        ],
    });

    const productMongo = await ProductMongo.findByIdAndUpdate(
        product.id,
        productDenormalized.toJSON(),
        {
            upsert: true,
            new: true,
        }
    );
};