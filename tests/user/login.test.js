const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AuthController = require('./../../controllers/auth.controller');
const User = require('../../models/user.model')

jest.mock('../../models/user.model');

const reqLogin = {
  body: {
    mail: "lhourquin@gmail.com",
    password: "Kramberry62800!"
  }
}

const reqSignup = {
  body: {
    userName: "LeKalu592",
    birthday: "10-09-1998",
    mail: "lhourquinpropp@gmail.com",
    sex: "H",
    firstName: "Lucas",
    lastName: "Hourquin",
    password: "Kramberry62800!"

  }
}
const res = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x)
}


it('should send a status code of 409 when mail or username is already taken', async () => {

  // User.findOne.mockImplementationOnce(() => ({
    // "idUser": 51,
    // "userName": "LeKalu59",
    // "birthday": "1998-10-09",
    // "mail": "lhourquinpro@gmail.com",
    // "sex": "H",
    // "password": "$2a$10$kIbrqcVVXHaSi4CHHSOCfuqw6IqQ1.Yp1RwG5tWs1HhJHCapqVwuy",
    // "firstName": "Lucas",
    // "lastName": "Hourquin",
    // "isVerified": 1,
    // "confirmationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInVzZXJuYW1lIjoiTGVLYWx1NTkiLCJ4c3JmVG9rZW4iOiJjNjM2NDFiNDljM2VkYjliOGQyMGZjZGY0MzI1Y2M2Y2Q3YzMxODkzMjM0OTYxMWEyNDJhMmU5MWE4ZDAwZmFhMTA0ZmYxYjA0MDdhYmVlYTYwZWFhNjZlOGI4ZjlmZGQ1MzJlYzM2YmZhNmJhZjU3YTBiM2QyY2ExZTFjYThkNiIsImlhdCI6MTcxMDMwNTY4NSwiZXhwIjoxNzEwMzA5Mjg1fQ.01XSwt9JT4Orbo_25i8laQJISZLTGZKfd26Lr_dcmlU",
    // "createdAt": "2024-03-13",
    // "updatedAt": "2024-03-16"
  // }));

  await AuthController.signup(reqSignup, res);

  expect(res.status).toHaveBeenCalledWith(409);
  expect(res.send).toHaveBeenCalledTimes(1);
})

// jest.mock('bcryptjs');
// jest.mock('jsonwebtoken');
// jest.mock('./../../models/user.model', () => ({
//   findOne: jest.fn()
// }));

// describe('Test de la fonction login', () => {
//   it('devrait retourner un token et les infos utilisateur si les identifiants sont corrects', async () => {
//     const mockUser = {
//       idUser: '1',
//       userName: 'TestUser',
//       mail: 'test@example.com',
//       pwd: 'hashedPassword'
//     };

//     require('./../../models/user.model').findOne.mockResolvedValue(mockUser);

//     bcrypt.compare.mockResolvedValue(true);

//     const expectedToken = 'jwt.token.here';
//     jwt.sign.mockReturnValue(expectedToken);

//     const userData = { mail: 'test@example.com', pwd: 'hashedPassword' };
//     const result = await login(userData);

//     expect(result).toHaveProperty('token');
//     expect(result).toHaveProperty('user');
//     expect(result.user).not.toHaveProperty('pwd');
//     expect(jwt.sign).toHaveBeenCalledTimes(1);
//   });

// });
