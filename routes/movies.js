const router = require('express').Router();
const { movieIdValid } = require('../middlewares/validation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:id', movieIdValid, deleteMovie);

module.exports = router;
