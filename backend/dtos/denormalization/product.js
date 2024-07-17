const ProductMongo = require("../../models/mongo/product");

module.exports = async function denormalizeProduct(product, models) {
    const Product = models.Product;
    const productDenormalized = await Product.findByPk(product.id, {
        attributes: [
            "id",
            "name",
            "description",
            "price",
            "availableStock", // TODO: Create new table Stock
            "imageSrc", // TODO: Create new table Image
            "imageAlt",
            "reviewCount"
        ],
        include: [
            // TODO: Includes futur new table Stock & Image
            { 
                model: models.ProductGenre, 
                attributes: ["id", "name"],
                order: [["updatedAt", "DESC"]],
            },
            { 
                model: models.ProductFormat, 
                attributes: ["id", "name"],
                order: [["updatedAt", "DESC"]],
            },
            { 
                model: models.ProductArtist, 
                attributes: ["id", "name"],
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