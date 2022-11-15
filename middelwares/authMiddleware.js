const jwt = require('jsonwebtoken');
const { User } = require('../db/userSchema');
const { NotAuthorizedError } = require("../helpers/error");

const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        
        if (!authorization) {
            next(new NotAuthorizedError('Please, provide a token in request authorization header'));
        }

        const [, token] = authorization.split(' ');

        if (!token) {
            next(new NotAuthorizedError('Please, provide a token'));
        }

        const userAuth = jwt.decode(token, process.env.JWT_SECRET);

        if (!userAuth) {
            next(new NotAuthorizedError('User is not defind'));
        }

        const id = userAuth._id;
        const user = await User.findOne({ id });      
        const userToken = user.token;

        if (token !== userToken) {
            next(new NotAuthorizedError('Not authorized'))
        }

        req.token = token;
        req.user = userAuth;
        next();

    } catch (e) {
        next(new NotAuthorizedError('Invalid token'));
    }
}

module.exports = {
    authMiddleware
}