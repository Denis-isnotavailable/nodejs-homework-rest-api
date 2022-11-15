const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../db/userSchema");
const { RegistrationError, NotAuthorizedError } = require("../helpers/error");

const registration = async (email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new RegistrationError("Email in use");
    }

    const newUser = new User({ email, password });    
    await newUser.save()
    
    return {
        status: '201 Created',      
        data: {
            user: {
                email: email,
                subscription: "starter"
            }
        },
    };
}

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new NotAuthorizedError("Email is wrong");
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError("Password is wrong");
    }

    const token = jwt.sign({
        _id: user._id,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET);

    const id = user._id; 
    await User.update({ id }, { token });

    return token;
}

const logout = async (authorization) => {
    const [, token] = authorization.split(' ');
    
    const userAuth = jwt.decode(token, process.env.JWT_SECRET);    
    const id = userAuth._id;

    await User.update({ id }, { token: null });    

    return token;
}

const current = async (id) => {
    const user = await User.findOne({ id }); 

    return {
        email: user.email,
        subscription: user.subscription
    };
}



module.exports = {
    registration,
    login,
    logout,
    current
}