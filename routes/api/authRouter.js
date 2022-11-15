const express = require('express');
const { authMiddleware } = require('../../middelwares/authMiddleware');
const { authValidation } = require('../../middelwares/validationMiddlewares');
const { userRegistrationModel, userLoginModel, userLogoutModel, currentModel } = require('../../models/authModel');

const authRouter = express.Router();

authRouter.post('/users/signup', authValidation, userRegistrationModel);
authRouter.post('/users/login', authValidation, userLoginModel);
authRouter.get('/users/logout', authMiddleware, userLogoutModel);
authRouter.get('/users/current', authMiddleware, currentModel);


module.exports = authRouter;