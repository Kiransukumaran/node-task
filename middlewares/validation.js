const { param, validationResult } = require('express-validator')

const paramValidation = () => {
    return param('id').exists().isNumeric();
}

const validateRequests = (req, res, next) => {
    const error = validationResult(req);

    if (error.isEmpty()) {
        return next();
    }

    return res.status(422).send({ error: "Invalid or No user id" })
}

module.exports = {
    paramValidation,
    validateRequests,
}
