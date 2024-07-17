const connection = require("./db");

const ProductMongoSchema = new connection.Schema({
    _id: Number,
    name: String,
    description: String,
    price: Number,
    availableStock: Number,
    imageSrc: String,
    imageAlt: String,
    reviewCount: Number,
    ProductGenre: { 
        id: Number,
        name: String,
        updatedAt: Date
    },
    ProductFormat: { 
        id: Number,
        name: String,
        updatedAt: Date
    },
    ProductArtist: { 
        id: Number,
        name: String,
        updatedAt: Date
    },
    ProductCustomerEvaluation: [{
        _id: Number,
        rating: Number,
        comment: String,
        Customer: {
            _id: Number,
            firstName: String,
            lastName: String
        },
        updatedAt: Date
    }]
});

const ProductMongo = connection.model('Product', ProductMongoSchema);

module.exports = ProductMongo;