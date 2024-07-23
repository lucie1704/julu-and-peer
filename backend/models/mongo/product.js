const connection = require("./db");

const ProductCustomerEvaluationMongoSchema = new connection.Schema({
    id: String,
    rating: Number,
    comment: String,
    Customer: {
        id: String,
        firstName: String,
        lastName: String
    },
    updatedAt: Date
})

const StockMongoSchema = new connection.Schema({
    id: String,
    type: String,
    quantity: Number
})

const ImageMongoSchema = new connection.Schema({
    id: String,
    width: Number,
    height: Number,
    type: String,
    description: String,
    alt: String,
    path: String
})

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
    ProductCustomerEvaluation: [ProductCustomerEvaluationMongoSchema],
    Stocks: [StockMongoSchema],
    Images: [ImageMongoSchema]
});

const ProductMongo = connection.model('Product', ProductMongoSchema);

module.exports = ProductMongo;