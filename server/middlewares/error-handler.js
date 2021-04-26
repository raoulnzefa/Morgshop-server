const errorHandler = (err, req, res, next) => {
  if (Array.isArray(err.message)) {
    res.status(400).json(err);
  } else if (err.status === 400) {
    if (err.message) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(err.status).json({ message: "Your input is invalid" });
    }
  } else if (err.status === 401) {
    if (err.message) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(err.status).json({ message: "Invalid email or password" });
    }
  } else if (err.status === 404) {
    if (err.message) {
      res.status(err.status).json({ message: err.message });
    } else {
      res
        .status(err.status)
        .json({ message: "Cannot found product with this id" });
    }
  } else if (err.status === 500) {
    res.status(err.status).json({ message: "Internal server error" });
  }
};

module.exports = errorHandler;
