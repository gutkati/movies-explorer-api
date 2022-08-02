const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { ObjectId } = mongoose.Schema.Types;
const { MESSAGES } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режисер
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска
    type: String,
    required: true,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: MESSAGES.wrongUrl,
    },
  },
  trailerLink: { // ссылка на трейлер фильма
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: MESSAGES.wrongUrl,
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: MESSAGES.wrongUrl,
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    required: true,
    type: ObjectId,
    ref: 'user',
  },
  movieId: { // id фильма
    type: Number,
    required: true,
  },
  nameRU: { // название фильма на русском
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
