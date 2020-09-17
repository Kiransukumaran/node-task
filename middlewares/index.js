const validateToken = require('./jwt-auth');
const { paramValidation, validateRequests } = require('./validation');

module.exports = {
    validateToken,
    paramValidation,
    validateRequests
}
