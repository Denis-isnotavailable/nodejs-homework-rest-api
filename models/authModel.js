const { registration, login, logout, current } = require("../service/authService");


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
        await logout(authorization);
               
        res.json.status(204)({
            status: "No content",
            code: "204"
        });
    } catch (e) {
        next(e);
    }
}

// Get current 
const currentModel = async (req, res, next) => {    
    const id = req.user._id;
    try {        
        const user = await current(id);
               
        res.json({
            status: "Success",
            data: {
                user
            }
        });
    } catch (e) {
        next(e);
    }
}


module.exports = {
    userRegistrationModel,
    userLoginModel,
    userLogoutModel,
    currentModel
}