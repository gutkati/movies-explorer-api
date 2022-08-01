const { MESSAGES } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => { // центролизованный обработчик ошибок
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? MESSAGES.serverError
        : message,
    });
  next();
};
