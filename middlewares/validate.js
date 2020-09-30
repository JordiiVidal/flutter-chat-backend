const { validationResult } = require("express-validator");

const validateSingUp = (request, res, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped(),
        });
    }

    next();
}

module.exports = {
    validateSingUp
};