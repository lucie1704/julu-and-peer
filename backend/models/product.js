'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductGenre, { foreignKey: 'genreId' });
      Product.belongsTo(models.ProductFormat, { foreignKey: 'formatId' });
      Product.belongsTo(models.ProductArtist, { foreignKey: 'artistId' });
      Product.hasMany(models.ProductCustomerEvaluation, { foreignKey: 'productId' });
      Product.belongsToMany(models.Order, { through: models.OrdersProducts })
      Product.belongsToMany(models.Wishlist, { through: 'WishlistsProducts' });
    }
    static addHooks(models) {
      Product.addHook('afterCreate', async (product) => {
        // TODO: Check for table associated doesn't appear on mongo.
        await denormalizeProduct(product, models)
      });
      Product.addHook('afterUpdate', async (product, { fields }) => {
        // Maybe check fields in case.
        await denormalizeProduct(product, models)
      });
      // TODO: Delete Product document in Mongo.
      // Product.addHook('afterDelete', async (product, { fields }) => {
      // });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL,
    },
    availableStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageSrc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageAlt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductGenres',
        key: 'id'
      },
      allowNull: false
    },
    formatId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductFormats',
        key: 'id'
      },
      allowNull: false
    },
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductArtists',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    defaultScope: {
      attributes: { exclude:
        [
        'genreId',
        'formatId',
        'artistId',
        'createdAt',
        'updatedAt',
      ]
      },
    },
    timestamps: true,
  });
  return Product;
};