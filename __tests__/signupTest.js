/* eslint-disable no-undef */
// const jest = require('jest');
// const jwt = require('jsonwebtoken');
// const { registration } = require("../service/authService");
// const { User } = require("../db/userSchema");



// const add = (a, b) => {
//     return a + b;
// }

// describe('hooks', function () {  

//   test('1 add 2 to equal 3', () => {
//     console.log('1 add 2 to equal 3');
//     expect(add(1, 2)).toBe(3);
//   });

//   test('3 add 2 to equal 5', () => {
//     console.log('3 add 2 to equal 5');
//     expect(add(3, 2)).toBe(5);
//   });
    
// });

// describe('User registration test', () => {
//     it('should signup User by email and password', async () => {
//         const email = "denis56.gmail.com";
//         const password = "123456";
//         const subscription = "starter";        
//         const status = '201 Created';

//         // const token = jwt.sign({
//         //         _id: id,
//         //         createdAt: createdAt
//         // }, process.env.JWT_SECRET);
        
//         const user = {            
//             email: email, 
//             subscription: subscription
//         }

//         const expected = {
//         status: '201 Created',      
//         data: {
//             user: {
//                 email: email,
//                 subscription: "starter"
//             }
//         },
//     };


//         jest.spyOn(User, 'findOne').mockImplementationOnce(async () => (user));

//         // const result = await registration(email, password);        

//         expect(await registration(email, password)).toBe(expected);
//         // expect(result.data).toBe(user);
//     })
// });