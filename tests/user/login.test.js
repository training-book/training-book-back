const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AuthService  = require('./../../services/auth.service'); 

it('should send a status code of 400 when user don\'t exist', async () => {
  const userData = {
    mail : "lhourquin@gmail.com",
    password : "tatata" 
  }
  // console.log(AuthService.test + ' from AuthSerice class');
  await AuthService.login(userData);
})

it('should send a status code of 400 when user exist', () => {

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
