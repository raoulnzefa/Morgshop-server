const router = require("express").Router();
const UserController = require("../controllers/user-controller");
const ProductController = require("../controllers/product-controller");
const CartController = require("../controllers/cart-controller");
const {
  authenticate,
  adminAuthorize,
  userAuthorize,
} = require("../middlewares/auth");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to my E-Commerce Morgshop Server!" })
);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authenticate);

router.get("/products", ProductController.productList);
router.get("/products/:id", ProductController.searchProductById);

router.get("/carts", CartController.listCart);
router.post("/carts/:productId", CartController.addProductToCart);
router.delete(
  "/carts/:id",
  userAuthorize,
  CartController.deleteProductFromCart
);
router.patch(
  "/carts/:id",
  userAuthorize,
  CartController.dropOneProductFromCart
);
router.patch("/checkout", CartController.checkout);
router.get("/transaction/history", CartController.transactionHistory);

router.use(adminAuthorize);

router.post("/products", ProductController.addProduct);
router.delete("/products/:id", ProductController.deleteProduct);
router.put("/products/:id", ProductController.editProduct);

module.exports = router;
