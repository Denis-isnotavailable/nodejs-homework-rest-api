const { registration, login, logout } = require("../service/authService");


// Registration
const userRegistrationModel = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await registration(email, password);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
}

// Login
const userLoginModel = async (req, res, next) => {
    const { email, password } = req.body;    
    try {
        const result = await login(email, password);
        
        res.status(200).json({
            status: "200 OK",
            token: result,
            user: {
                email: email,
                subscription: "starter"
            }
        });
    } catch (e) {
        next(e);
    }
}

// Logout
const userLogoutModel = async (req, res, next) => {   
    const { authorization } = req.headers;
    
    try {
        const token = await logout(authorization);
        // console.log(req.token);
        // console.log(req.user);        
        res.json({
            authorization: `Bearer ${token}`
        });
    } catch (e) {
        next(e);
    }
}


module.exports = {
    userRegistrationModel,
    userLoginModel,
    userLogoutModel
}