const { param } = require('express-validator');
const { getAllUsers, getUser } = require('./user');

const router = require('express').Router();

router.get('/', getAllUsers);
router.get('/:id', param('id').exists().isNumeric(),  getUser);

module.exports = router;
