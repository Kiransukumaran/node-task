const router = require('express').Router();
const user = require('../modules/user');

router.use('/user', user);

module.exports = router;