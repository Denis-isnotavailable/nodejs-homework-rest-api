const { User } = require('../db/userSchema');
const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require("../helpers/error");

const logoutMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;       
        
        if (!authorization) {
            next(new NotAuthorizedError('Please, provide a token in request authorization header'));
        }

        const [, token] = authorization.split(' ');
        const userAuth = jwt.decode(token, process.env.JWT_SECRET);
        const id = userAuth._id;
        const user = await User.findOne({ id });        
        const userToken = user.token;
        const u = req.user;
        console.log(u);
        
        if (!token) {
            next(new NotAuthorizedError('Please, provide a token'));
        }

        if (!userToken) {
            next(new NotAuthorizedError('Not authorized'));
        }

        next()

    } catch (e) {
        next(new NotAuthorizedError('Invalid token'));
    }
}

module.exports = {
    logoutMiddleware
}