const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

function describeErrors(err, res, next) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new ValidationError('Переданы некорректные данные'));
  } else {
    next(err);
  }
}

module.exports.getMovies = (req, res, next) => {
  Movie.find({}) // поиск всех документов по параметрам
    .then((movies) => res.status(200).send(movies))
    .catch((err) => describeErrors(err, res, next));
};

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN  } = req.body;

  const id = req.user._id; // id пользователя взяли из мидлвэры в файле app.js

  Movie.create({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN, owner: id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => describeErrors(err, res, next));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id) // удаление фильма по Id
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }

      if (req.user._id !== movie.owner.toString()) { // нет прав удалять видео другого пользователя
        throw new ForbiddenError('Вы не можете удалить этот фильм');
      }
      Movie.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).send({ message: 'Фильм успешно удален' }))
        .catch(next);
    })
    .catch((err) => describeErrors(err, res, next));
};