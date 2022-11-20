// const jest = require('jest');
const jwt = require('jsonwebtoken');
const { login } = require("../service/authService");
const { User } = require("../db/userSchema");

describe('User registration test', () => {
    it('should signup User by email and password', async () => {
        const email = "denis.gmail.com";
        const password = "123456";
        const createdAt = new Date().getTime();
        const id = "123456";

        const token = jwt.sign({
                _id: id,
                createdAt: createdAt
            }, process.env.JWT_SECRET);

                

        jest.spyOn(User, 'update').mockImplementationOnce(async () => ({id, token}));

        const result = login(email, password);
    })
});