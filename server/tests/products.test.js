const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/jwt");

const admin_token = generateToken({
  email: "admin@mail.com",
  role: "admin",
});

const customer_token = generateToken({
  email: "customer@mail.com",
  role: "customer",
});

describe("testing /products admin", () => {
  describe("testing GET /products admin success", () => {
    it("should return response with status code 200", (done) => {
      request(app)
        .get("/products")
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(typeof res.body[0]).toEqual("object");
            expect(res.body[0]).toHaveProperty("id");
            expect(typeof res.body[0].id).toEqual("number");
            expect(res.body[0]).toHaveProperty("name");
            expect(res.body[0]).toHaveProperty("image_url");
            expect(res.body[0]).toHaveProperty("price");
            expect(res.body[0]).toHaveProperty("stock");
            expect(res.body[0]).toHaveProperty("category");
            done();
          }
        });
    });
  });

  describe("testing GET /products admin failed", () => {
    it("should return response with status code 401, don't have access_token", (done) => {
      request(app)
        .get("/products")
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", "Please login first");
            done();
          }
        });
    });
  });

  describe("testing GET /products/:id admin success", () => {
    it("should return response with status code 200", (done) => {
      request(app)
        .get("/products/16")
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("id");
            expect(typeof res.body.id).toEqual("number");
            expect(res.body).toHaveProperty("name");
            expect(res.body).toHaveProperty("image_url");
            expect(res.body).toHaveProperty("price");
            expect(res.body).toHaveProperty("stock");
            expect(res.body).toHaveProperty("category");
            done();
          }
        });
    });
  });

  describe("testing GET /products/:id admin failed", () => {
    it("should return response with status code 401, don't have access_token", (done) => {
      request(app)
        .get("/products")
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", "Please login first");
            done();
          }
        });
    });

    it("should return response with status code 404, cannot found product with this id", (done) => {
      request(app)
        .get("/products/100")
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(404);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Cannot found product with this id"
            );
            done();
          }
        });
    });
  });

  describe("testing POST /products admin success", () => {
    it("should return response with status code 201", (done) => {
      const body = {
        name: "name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: 1,
        stock: 1,
        category: "category test",
      };
      request(app)
        .post("/products")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(201);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("id");
            expect(typeof res.body.id).toEqual("number");
            expect(res.body).toHaveProperty("name", body.name);
            expect(res.body).toHaveProperty("image_url", body.image_url);
            expect(res.body).toHaveProperty("price", body.price);
            expect(res.body).toHaveProperty("stock", body.stock);
            expect(res.body).toHaveProperty("category", body.category);
            expect(res.body).toHaveProperty("createdAt");
            expect(res.body).toHaveProperty("updatedAt");
            done();
          }
        });
    });
  });

  describe("testing POST /products admin failed", () => {
    it("should return response with status code 401, don't have access_token", (done) => {
      const body = {
        name: "name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: 1,
        stock: 1,
        category: "category test",
      };
      request(app)
        .post("/products")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", "Please login first");
            done();
          }
        });
    });

    it("should return response with status code 401, don't have the right access_token / admin token", (done) => {
      const body = {
        name: "name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: 1,
        stock: 1,
        category: "category test",
      };
      request(app)
        .delete("/products")
        .send(body)
        .set("access_token", customer_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Cannot access this features, this is for admin only"
            );
            done();
          }
        });
    });

    it("should return response with status code 400, missing required input", (done) => {
      const body = {
        name: "",
        image_url: "",
        price: 1,
        stock: 1,
        category: "",
      };
      request(app)
        .post("/products")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", [
              "Name is required",
              "Image URL is required",
              "Must be an URL format",
              "Category is required",
            ]);
            done();
          }
        });
    });

    it("should return response with status code 400, minimum 0 on price", (done) => {
      const body = {
        name: "name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: -1,
        stock: 1,
        category: "category test",
      };
      request(app)
        .post("/products")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", [
              "Validation min on price failed",
            ]);
            done();
          }
        });
    });

    it("should return response with status code 400, minimum 0 on stock", (done) => {
      const body = {
        name: "name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: 1,
        stock: -1,
        category: "category test",
      };
      request(app)
        .post("/products")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", [
              "Validation min on stock failed",
            ]);
            done();
          }
        });
    });

    it("should return response with status code 400, invalid types", (done) => {
      const body = {
        name: "name test",
        image_url: "failed test url",
        price: "failed test price",
        stock: "failed test stock",
        category: "category test",
      };
      request(app)
        .post("/products")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", [
              "Must be an URL format",
              "Price must be a number",
              "Stock must be a number",
            ]);
            done();
          }
        });
    });
  });

  describe("testing PUT /products/:id admin success", () => {
    it("should return response with status code 200", (done) => {
      const body = {
        name: "update name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: 1,
        stock: 1,
        category: "update category test",
      };
      request(app)
        .put("/products/16")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("id");
            expect(typeof res.body.id).toEqual("number");
            expect(res.body).toHaveProperty("name", body.name);
            expect(res.body).toHaveProperty("image_url", body.image_url);
            expect(res.body).toHaveProperty("price", body.price);
            expect(res.body).toHaveProperty("stock", body.stock);
            expect(res.body).toHaveProperty("category", body.category);
            expect(res.body).toHaveProperty("createdAt");
            expect(res.body).toHaveProperty("updatedAt");
            done();
          }
        });
    });
  });

  describe("testing PUT /products/:id admin failed", () => {
    it("should return response with status code 401, don't have access_token", (done) => {
      const body = {
        name: "update name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: 1,
        stock: 1,
        category: "update category test",
      };
      request(app)
        .put("/products/16")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", "Please login first");
            done();
          }
        });
    });

    it("should return response with status code 401, don't have the right access_token / admin token", (done) => {
      const body = {
        name: "update name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: 1,
        stock: 1,
        category: "update category test",
      };
      request(app)
        .put("/products/16")
        .send(body)
        .set("access_token", customer_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Cannot access this features, this is for admin only"
            );
            done();
          }
        });
    });

    it("should return response with status code 400, missing required input", (done) => {
      const body = {
        name: "",
        image_url: "",
        price: 1,
        stock: 1,
        category: "",
      };
      request(app)
        .put("/products/16")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", [
              "Name is required",
              "Image URL is required",
              "Must be an URL format",
              "Category is required",
            ]);
            done();
          }
        });
    });

    it("should return response with status code 400, minimum 0 for price", (done) => {
      const body = {
        name: "update name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: -1,
        stock: 1,
        category: "update category test",
      };
      request(app)
        .put("/products/16")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", [
              "Validation min on price failed",
            ]);
            done();
          }
        });
    });

    it("should return response with status code 400, minimum 0 for stock", (done) => {
      const body = {
        name: "update name test",
        image_url:
          "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        price: 1,
        stock: -1,
        category: "update category test",
      };
      request(app)
        .put("/products/16")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", [
              "Validation min on stock failed",
            ]);
            done();
          }
        });
    });

    it("should return response with status code 400, invalid types", (done) => {
      const body = {
        name: "update name test",
        image_url: "update failed test url",
        price: "update failed test price",
        stock: "update failed test stock",
        category: "update category test",
      };
      request(app)
        .put("/products/16")
        .send(body)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", [
              "Must be an URL format",
              "Price must be a number",
              "Stock must be a number",
            ]);
            done();
          }
        });
    });
  });

  describe("testing DELETE /products/:id (Manually change params id for delete) admin success", () => {
    it("should return response with status code 200", (done) => {
      request(app)
        .delete("/products/24")
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Successfully delete this product"
            );
            done();
          }
        });
    });
  });

  describe("testing DELETE /products/:id (Manually change params id for delete) admin failed", () => {
    it("should return response with status code 401, don't have access_token", (done) => {
      request(app)
        .delete("/products/25")
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", "Please login first");
            done();
          }
        });
    });

    it("should return response with status code 401, don't have the right access_token / admin token", (done) => {
      request(app)
        .delete("/products/25")
        .set("access_token", customer_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Cannot access this features, this is for admin only"
            );
            done();
          }
        });
    });

    it("should return response with status code 404, cannot found product with this id", (done) => {
      request(app)
        .delete("/products/100")
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(404);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Cannot found product with this id"
            );
            done();
          }
        });
    });
  });
});
