const router = require('express').Router();
const routUser = require('./users');
const routMovie = require('./movies');
const { loginValid, creatUserValid } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { MESSAGES } = require('../utils/constants');

router.post('/signup', creatUserValid, createUser);
router.post('/signin', loginValid, login);

router.use(auth);

router.use('/users', routUser);
router.use('/movies', routMovie);

router.use((req, res, next) => {
  next(new NotFoundError(MESSAGES.routNotFound));
});

module.exports = router;
