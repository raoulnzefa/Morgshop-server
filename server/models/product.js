"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Cart);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Image URL is required",
          },
          isUrl: {
            msg: "Must be an URL format",
          },
        },
      },
      price: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          isNumeric: {
            msg: "Price must be a number",
          },
          min: 0,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock is required",
          },
          isNumeric: {
            msg: "Stock must be a number",
          },
          min: 0,
        },
      },
      category: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Category is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
