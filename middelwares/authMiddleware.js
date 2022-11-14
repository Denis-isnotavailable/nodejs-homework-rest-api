const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require("../helpers/error");

const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        
        if (!authorization) {
            next(new NotAuthorizedError('Please, provide a token in request authorization header'));
        }

        const [, token] = authorization.split(' ');

        if (!token) {
            next(new NotAuthorizedError('Please, provide a token'));
        }

        const user = jwt.decode(token, process.env.JWT_SECRET);

        if (!user) {
            next(new NotAuthorizedError('User is not defind'));
        }

        req.token = token;
        req.user = user;
        next();

    } catch (e) {
        next(new NotAuthorizedError('Invalid token'));
    }
}

module.exports = {
    authMiddleware
}