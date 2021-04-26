if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middlewares/error-handler");
const routes = require("./routes");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

module.exports = app;
