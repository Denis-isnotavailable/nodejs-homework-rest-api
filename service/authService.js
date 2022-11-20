const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { User } = require("../db/userSchema");
const { RegistrationError, NotAuthorizedError, WrongParametrsError } = require("../helpers/error");

const registration = async (email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new RegistrationError("Email in use");
    }

    const httpUrl = gravatar.url(email, {protocol: 'http'});

    const newUser = new User({ email, password, avatarURL: httpUrl });
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
    const user = await User.findOne({ _id: id }); 

    return {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL
    };
}


const subscriptionUpdate = async (id, subscription) => {    
    const index = ["starter", "pro", "business"].indexOf(subscription);

    if (index === -1) {
        throw new WrongParametrsError("Subscription have to be one of 'starter', 'pro', 'business'");
    }

    return User.findByIdAndUpdate(
        { _id: id },
        { subscription },
        { new: true })
        .select({ email: 1, subscription: 1 });
}



module.exports = {
    registration,
    login,
    logout,
    current,
    subscriptionUpdate
}