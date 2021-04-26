const { Cart, Product } = require("../models");

class CartController {
  static addProductToCart(req, res, next) {
    const input = {
      UserId: req.currentUser.id,
      ProductId: req.params.productId,
      quantity: 1,
    };
    const UserId = req.currentUser.id;
    Product.findOne({ where: { id: input.ProductId } })
      .then((product) => {
        if (product.stock !== 0) {
          return Cart.findOne({
            where: { UserId, ProductId: input.ProductId, isPaid: false },
            include: [
              {
                model: Product,
                attributes: ["stock"],
              },
            ],
          });
        } else {
          throw {
            status: 400,
            message:
              "Cannot add product to your cart, this product is out of stock!",
          };
        }
      })
      .then((cart) => {
        if (cart) {
          if (cart.Product.stock > cart.quantity) {
            return Cart.increment("quantity", {
              where: { UserId, ProductId: input.ProductId, isPaid: false },
            });
          } else {
            next({
              status: 400,
              message:
                "Cannot add product to your cart, your quantity needs is higher than this product stock",
            });
          }
        } else {
          return Cart.create(input);
        }
      })
      .then((cart) => {
        if (Array.isArray(cart)) {
          res.status(200).json({
            id: cart[0][0][0].id,
            quantity: cart[0][0][0].quantity,
            isPaid: cart[0][0][0].isPaid,
            UserId: cart[0][0][0].UserId,
            ProductId: cart[0][0][0].ProductId,
          });
        } else {
          res.status(201).json({
            id: cart.id,
            quantity: cart.quantity,
            isPaid: cart.isPaid,
            UserId: cart.UserId,
            ProductId: cart.ProductId,
          });
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          next(err);
        } else if (
          err.message ===
            'insert or update on table "Carts" violates foreign key constraint "Carts_ProductId_fkey"' ||
          err.name === "TypeError"
        ) {
          next({ status: 404 });
        } else next({ status: 500 });
      });
  }

  static listCart(req, res, next) {
    const UserId = req.currentUser.id;
    Cart.findAll({
      where: { UserId, isPaid: false },
      attributes: ["id", "quantity", "UserId", "ProductId", "isPaid"],
      include: [
        {
          model: Product,
          attributes: ["id", "name", "image_url", "price", "stock", "category"],
        },
      ],
    })
      .then((carts) => {
        res.status(200).json(carts);
      })
      .catch((err) => {
        next({ status: 500 });
      });
  }

  static deleteProductFromCart(req, res, next) {
    const id = req.params.id;
    const UserId = req.currentUser.id;
    Cart.destroy({ where: { id, UserId } })
      .then((cart) => {
        if (cart) {
          res
            .status(200)
            .json({ message: "Successfully delete product from your cart" });
        } else {
          throw { status: 401, message: "Cannot delete cart with this id!" };
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          next(err);
        } else {
          next({ status: 500 });
        }
      });
  }

  static dropOneProductFromCart(req, res, next) {
    const id = req.params.id;
    const UserId = req.currentUser.id;
    Cart.findOne({ where: { id, UserId, isPaid: false } })
      .then((cart) => {
        if (cart) {
          if (cart.quantity > 1) {
            return Cart.increment("quantity", {
              by: -1,
              where: { id, UserId },
            });
          } else return Cart.destroy({ where: { id, UserId } });
        } else next({ status: 404 });
      })
      .then((cart) => {
        if (Array.isArray(cart)) {
          res.status(200).json({
            id: cart[0][0][0].id,
            quantity: cart[0][0][0].quantity,
            isPaid: cart[0][0][0].isPaid,
            UserId: cart[0][0][0].UserId,
            ProductId: cart[0][0][0].ProductId,
          });
        } else {
          res
            .status(200)
            .json({ message: "Successfully delete product from your cart" });
        }
      })
      .catch((err) => {
        next({ status: 500 });
      });
  }

  static checkout(req, res, next) {
    const UserId = req.currentUser.id;
    Cart.findAll({
      where: { UserId, isPaid: false },
      include: [
        {
          model: Product,
          attributes: ["stock"],
        },
      ],
    })
      .then((carts) => {
        if (carts.length) {
          const arrayProductUpdate = [];
          carts.forEach((cart) => {
            const productUpdate = Product.update(
              {
                stock: cart.Product.stock - cart.quantity,
              },
              { where: { id: cart.ProductId }, returning: true }
            );
            arrayProductUpdate.push(productUpdate);
          });
          return Promise.all(arrayProductUpdate);
        } else {
          throw {
            status: 404,
            message: "Cannot checkout because there's no product in the cart",
          };
        }
      })
      .then(() => {
        return Cart.update({ isPaid: true }, { where: { UserId } });
      })
      .then(() => {
        res
          .status(200)
          .json({ message: "Successfully buy all product from your cart" });
      })
      .catch((err) => {
        if (err.status === 404) {
          next(err);
        } else {
          next({ status: 500 });
        }
      });
  }

  static transactionHistory(req, res, next) {
    const UserId = req.currentUser.id;
    Cart.findAll({
      where: { UserId, isPaid: true },
      attributes: ["id", "quantity", "UserId", "ProductId", "isPaid"],
      include: [
        {
          model: Product,
          attributes: ["id", "name", "image_url", "price", "stock", "category"],
        },
      ],
    })
      .then((carts) => {
        res.status(200).json(carts);
      })
      .catch((err) => {
        next({ status: 500 });
      });
  }
}

module.exports = CartController;
