const { comparePassword } = require("../helpers/password-helper");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const validPassword = comparePassword(password, user.password);
          if (validPassword) {
            const payload = { email: user.email, role: user.role };
            const access_token = generateToken(payload);
            res.status(200).json({ ...payload, access_token });
          } else throw { status: 401 };
        } else throw { status: 401 };
      })
      .catch((err) => {
        if (err.status === 401) next(err);
        else next({ status: 500 });
      });
  }

  static register(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password,
    };
    User.create(input)
      .then((user) => {
        res.status(201).json({ id: user.id, email: user.email });
      })
      .catch((err) => {
        if (err.errors) {
          let errors = [];
          err.errors.forEach((el) => {
            if (el.message === "email must be unique")
              errors.push("Email address is already registered");
            else errors.push(el.message);
          });
          next({ message: errors });
        } else next({ status: 500 });
      });
  }
}

module.exports = UserController;
