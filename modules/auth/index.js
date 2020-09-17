const { validateToken } = require('../../middlewares');
const { loginBodyValidation, validateRequests } = require('../../middlewares/validation');
const { loginUser, getProfile } = require('./auth');

const router = require('express').Router();

router.post('/login', loginBodyValidation(), validateRequests, loginUser);
router.get('/profile', validateToken, getProfile);

module.exports = router;
