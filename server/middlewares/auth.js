const { verifyToken } = require("../helpers/jwt");
const { User, Cart } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw { status: 401, message: "Please login first" };
    }
    const { email, role } = verifyToken(req.headers.access_token);
    const user = await User.findOne({ where: { email, role } });
    if (!user) throw { status: 401, message: "Invalid token" };
    req.currentUser = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      next({ status: 401, message: "Invalid token" });
    } else if (err.message) next(err);
  }
};

const adminAuthorize = (req, res, next) => {
  if (req.currentUser.role !== "admin") {
    next({
      status: 401,
      message: "Cannot access this features, this is for admin only",
    });
  } else next();
};

const userAuthorize = async (req, res, next) => {
  try {
    const UserId = req.currentUser.id;
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { id } });
    if (!cart) {
      throw { status: 404, message: "Cart not found" };
    }
    if (cart.UserId !== UserId) {
      throw { status: 401, message: "Unauthorized user" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authenticate,
  adminAuthorize,
  userAuthorize,
};
