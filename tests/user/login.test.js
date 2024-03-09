const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { login } = require('./../../services/user.service'); 

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('./../../models/user.model', () => ({
  findOne: jest.fn()
}));

describe('Test de la fonction login', () => {
  it('devrait retourner un token et les infos utilisateur si les identifiants sont corrects', async () => {
    const mockUser = {
      idUser: '1',
      userName: 'TestUser',
      mail: 'test@example.com',
      pwd: 'hashedPassword'
    };

    require('./../../models/user.model').findOne.mockResolvedValue(mockUser);

    bcrypt.compare.mockResolvedValue(true);

    const expectedToken = 'jwt.token.here';
    jwt.sign.mockReturnValue(expectedToken);

    const userData = { mail: 'test@example.com', pwd: 'hashedPassword' };
    const result = await login(userData);

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
    expect(result.user).not.toHaveProperty('pwd');
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });

});
