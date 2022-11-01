const router = require('express').Router();
const { movieIdValid } = require('../middlewares/validation');
const { validationDeleteMovie } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', movieIdValid, createMovie);
router.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = router;
