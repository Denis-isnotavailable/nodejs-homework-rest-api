const express = require('express');
const { authMiddleware } = require('../../middelwares/authMiddleware');
const { authValidation } = require('../../middelwares/validationMiddlewares');
const { userRegistrationModel, userLoginModel, userLogoutModel, currentModel, subscriptionUpdateModel } = require('../../models/authModel');

const authRouter = express.Router();

authRouter.post('/users/signup', authValidation, userRegistrationModel);
authRouter.post('/users/login', authValidation, userLoginModel);
authRouter.get('/users/logout', authMiddleware, userLogoutModel);
authRouter.get('/users/current', authMiddleware, currentModel);
authRouter.patch('/users', authMiddleware, subscriptionUpdateModel);


module.exports = authRouter;