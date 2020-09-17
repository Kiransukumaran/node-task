const router = require('express').Router();
const auth = require('../modules/auth');
const user = require('../modules/user');

router.use('/user', user);
router.use('/auth', auth);

module.exports = router;