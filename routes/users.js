const router = require('express').Router();
const { updateProfileValid } = require('../middlewares/validation');

const { getInfoAboutMe, updateProfile } = require('../controllers/users');

router.get('/me', getInfoAboutMe);
router.patch('/me', updateProfileValid, updateProfile);

module.exports = router;
