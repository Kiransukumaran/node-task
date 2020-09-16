const { getAllUsers, getUser } = require('./user');

const router = require('express').Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;