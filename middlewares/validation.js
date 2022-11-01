const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { MESSAGES } = require('../utils/constants');

module.exports.loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.creatUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.updateProfileValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.movieIdValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(MESSAGES.wrongUrl);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(MESSAGES.wrongUrl);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(MESSAGES.wrongUrl);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
