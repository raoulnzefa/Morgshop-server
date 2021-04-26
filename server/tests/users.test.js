const request = require("supertest");
const app = require("../app");

describe("testing /login admin", () => {
  describe("testing POST /login admin success", () => {
    it("should return response with status code 200", (done) => {
      const body = {
        email: "admin@mail.com",
        password: "1234",
      };
      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("email", body.email);
            expect(res.body).toHaveProperty("access_token");
            done();
          }
        });
    });
  });

  describe("testing POST /login admin failed", () => {
    it("should return response with status code 401, invalid email or password", (done) => {
      const body = {
        email: "admin@mail.com",
        password: "salah",
      };
      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Invalid email or password"
            );
            done();
          }
        });
    });

    it("should return response with status code 401, cannot found email in database", (done) => {
      const body = {
        email: "customers@mail.com",
        password: "1234",
      };
      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Invalid email or password"
            );
            done();
          }
        });
    });

    it("should return response with status code 401", (done) => {
      const body = {
        email: "",
        password: "",
      };
      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Invalid email or password"
            );
            done();
          }
        });
    });
  });
});
