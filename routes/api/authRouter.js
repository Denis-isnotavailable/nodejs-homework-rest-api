const express = require('express');
const { authMiddleware } = require('../../middelwares/authMiddleware');
// const { logoutMiddleware } = require('../../middelwares/logoutMiddleware');
const { authValidation } = require('../../middelwares/validationMiddlewares');
const { userRegistrationModel, userLoginModel, userLogoutModel } = require('../../models/authModel');

const authRouter = express.Router();

authRouter.post('/users/signup', authValidation, userRegistrationModel);
authRouter.post('/users/login', authValidation, userLoginModel);
authRouter.get('/users/logout', authMiddleware, userLogoutModel);


module.exports = authRouter;