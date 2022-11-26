const {
    registration,
    login,
    logout,
    current,
    subscriptionUpdate,
    verification,
    verifyRepeat } = require("../service/authService");


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

// SubscriptionUpdate
const subscriptionUpdateModel = async (req, res, next) => {
    const id = req.user._id;
    const { subscription } = req.body;
    try {        
        const user = await subscriptionUpdate(id, subscription);
               
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

// Verification
const verifyModel = async (req, res, next) => {
    const { verificationToken } = req.params;
    try {
        await verification(verificationToken);

        res.json({
            message: 'Verification successful'
        });
    } catch (e) {
        next(e)
    }
}

// Verify Repeat
const verifyRepeatModel = async (req, res, next) => {
    const { email } = req.body;
    try {
        await verifyRepeat(email);

        res.json({
            message: 'Verification email sent'
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    userRegistrationModel,
    userLoginModel,
    userLogoutModel,
    currentModel,
    subscriptionUpdateModel,
    verifyModel,
    verifyRepeatModel
}