const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // неболее 100 запросов
  message: 'Вы привысили лимит в 100 запросов за 15 минут',
  headers: true,
});
