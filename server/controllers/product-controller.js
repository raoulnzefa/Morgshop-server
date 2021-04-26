const { Product } = require("../models");
const convertToRupiah = require("../helpers/idr-formatter");

class ProductController {
  static addProduct(req, res, next) {
    let input = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
    };
    Product.create(input)
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        if (err.errors) {
          let errors = [];
          err.errors.forEach((el) => {
            errors.push(el.message);
          });
          next({ message: errors });
        } else if (err.name === "SequelizeDatabaseError") next({ status: 400 });
        else next({ status: 500 });
      });
  }

  static productList(req, res, next) {
    Product.findAll({
      order: [["stock", "desc"]],
    })
      .then((product) => {
        product.forEach((el) => {
          el.price = convertToRupiah(el.price);
        });
        res.status(200).json(product);
      })
      .catch(() => {
        next({ status: 500 });
      });
  }

  static searchProductById(req, res, next) {
    let id = +req.params.id;
    Product.findByPk(id)
      .then((product) => {
        if (!product) throw { status: 404 };
        res.status(200).json(product);
      })
      .catch((err) => {
        if (err.status === 404) next(err);
        else next({ status: 500 });
      });
  }

  static deleteProduct(req, res, next) {
    let id = +req.params.id;
    Product.destroy({ where: { id }, returning: true })
      .then((Product) => {
        if (!Product) throw { status: 404 };
        res.status(200).json({ message: "Successfully delete this product" });
      })
      .catch((err) => {
        if (err.status === 404) next(err);
        else next({ status: 500 });
      });
  }

  static editProduct(req, res, next) {
    let id = +req.params.id;
    let input = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
    };
    Product.update(input, { where: { id }, returning: true })
      .then((product) => {
        if (!product[1]) throw { message: "Your category input is invalid" };
        else if (!product[0])
          throw { message: "Cannot found Product with this id" };
        res.status(200).json(product[1][0]);
      })
      .catch((err) => {
        if (err.errors) {
          let errors = [];
          err.errors.forEach((el) => {
            errors.push(el.message);
          });
          next({ message: errors });
        } else if (err)
          if (err) next(err);
          else next({ status: 500 });
      });
  }
}

module.exports = ProductController;
