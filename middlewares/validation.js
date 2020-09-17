const { param, validationResult, body } = require('express-validator')

const paramValidation = () => {
    return param('id').exists().isNumeric();
}

const loginBodyValidation = () => {
    return [
        body('username').exists().isString().isLowercase(),
        body('password').exists().isString()
    ];
}

const validateRequests = (req, res, next) => {
    const error = validationResult(req);

    if (error.isEmpty()) {
        return next();
    }

    return res.status(422).send({ error: "Validation failed" })
}

module.exports = {
    paramValidation,
    validateRequests,
    loginBodyValidation
}
