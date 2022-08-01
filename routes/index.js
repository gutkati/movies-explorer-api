const router = require('express').Router();
const routUser = require('./users');
const routMovie = require('./movies');
const { loginValid, creatUserValid } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', creatUserValid, createUser);
router.post('/signin', loginValid, login);

router.use(auth);

router.use('/users', routUser);
router.use('/movies', routMovie);
router.post('/signout', logout);

module.exports = router;
