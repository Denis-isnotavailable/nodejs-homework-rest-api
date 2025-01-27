const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../db/userSchema");
const { RegistrationError, NotAuthorizedError, WrongParametrsError } = require("../helpers/error");

const registration = async (email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new RegistrationError("Email in use");
    }

    const httpUrl = gravatar.url(email, { protocol: 'http' });
    const verificationToken = uuidv4();

    const newUser = new User({ email, password, avatarURL: httpUrl, verificationToken });
    await newUser.save();   

    const msg = {
        to: email,
        from: 'denis.slivinsk@gmail.com',
        subject: 'Thank you for registration!',
        text: `Please, confirm your email address GET http://localhost:3000/api/auth/users/verify/${verificationToken}`,
        html: `Please, confirm your email address GET http://localhost:3000/api/auth/users/verify/${verificationToken}`,
    };

    await sgMail.send(msg);
    
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

const verification = async (verificationToken) => {
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw new NotAuthorizedError("Not Found");
    }

    const id = user._id; 
    await User.update({ id }, { verificationToken: null, verify: true });
}

const verifyRepeat = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new WrongParametrsError("Email not found");
    }

    const verificationToken = user.verificationToken;

    if (!verificationToken) {
        throw new WrongParametrsError("Verification has already been passed");
    }

    const msg = {
        to: email,
        from: 'denis.slivinsk@gmail.com',
        subject: 'Thank you for registration!',
        text: `Please, confirm your email address GET http://localhost:3000/api/auth/users/verify/${verificationToken}`,
        html: `Please, confirm your email address GET http://localhost:3000/api/auth/users/verify/${verificationToken}`,
    };

    await sgMail.send(msg);
}

const login = async (email, password) => {
    const user = await User.findOne({ email, verify: true });

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
    subscriptionUpdate,
    verification,
    verifyRepeat
}