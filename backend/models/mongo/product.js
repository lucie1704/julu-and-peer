const connection = require("./db");

const ProductMongoSchema = new connection.Schema({
    _id: String,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    reviewCount: Number,
    discount: Number,
    ProductGenre: { 
        id: String,
        name: String,
        updatedAt: Date
    },
    ProductFormat: { 
        id: String,
        name: String,
        updatedAt: Date
    },
    ProductArtist: { 
        id: String,
        name: String,
        updatedAt: Date
    },
    ProductCustomerEvaluation: [{
        _id: String,
        rating: Number,
        comment: String,
        Customer: {
            _id: String,
            firstName: String,
            lastName: String
        },
        updatedAt: Date
    }],
    Stock: [{
        type: String,
        quantity: Number
    }],
    Image: [{
        width: Number,
        height: Number,
        type: String,
        description: String,
        alt: String,
        path: String
    }]
});

const ProductMongo = connection.model('Product', ProductMongoSchema);

module.exports = ProductMongo;