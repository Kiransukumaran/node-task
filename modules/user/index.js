const { paramValidation, validateRequests } = require('../../middlewares/validation');
const { getAllUsers, getUser } = require('./user');

const router = require('express').Router();

router.get('/', getAllUsers);
router.get('/:id', paramValidation(), validateRequests, getUser);

module.exports = router;
