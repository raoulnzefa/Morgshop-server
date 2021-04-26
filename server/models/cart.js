"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.User);
    }
  }
  Cart.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
        },
      },
      isPaid: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
      hooks: {
        beforeCreate: (cart) => {
          cart.isPaid = false;
        },
      },
    }
  );
  return Cart;
};
