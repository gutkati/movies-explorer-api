require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // мидлвэр
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors'); // библиотека CORS
const helmet = require('helmet');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { MONGO_URL } = require('./config');
const { errorHandler } = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/rateLimiter');
const { MESSAGES } = require('./utils/constants');
const { allowedCors } = require('./middlewares/cors');

const { PORT = 3001 } = process.env;

const app = express();
app.use(helmet()); // защита приложение путем настройки приложения
app.use(requestLogger); // записываются запросы и ответы
app.use(limiter);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

// middleware
app.use('*', cors(allowedCors));
app.use(bodyParser.json()); // данные с фронтенда приходят JSON-формата
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError(MESSAGES.pageNotFound));
});

app.use(errorLogger); // записываются все ошибки
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT);
