const errorHandler = (err, req, res, next) => {
  if (err.status && err.status >= 400 && err.status < 500) {
    res.status(err.status).json({ mes: err.message });
  } else {
    res.status(500).json({ mes: "Something went wrong" });
  }
};

export default errorHandler;
