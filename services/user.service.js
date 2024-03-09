require('dotenv').config();
const crypto = require('crypto');
const SECRET_KEY = process.env.JWT_SECRET;
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {

    static async createUser(userData) {

        const existingUserByMail = await userModel.findOne({ where: { mail: userData.mail } });
        const existingUserByUserName =  await userModel.findOne({ where: { userName: userData.userName } });
        if (existingUserByMail) {
            throw new Error('Cette adresse mail est déjà utilisé !');
        } else if(existingUserByUserName){
            throw new Error('Ce pseudo est déjà utilisé !');
        }else {

            const hashedPassword = await bcrypt.hash(userData.pwd, 10);

            const newUser = await userModel.create({
                ...userData,
                pwd: hashedPassword
            });

            if (newUser) {
                console.log(newUser)
                return newUser;
            }
        }
    }

    static async login(userData) {
        const userResponse = await userModel.findOne({ where: { mail: userData.mail } });
        if (userResponse) {
            const isPasswordValid = await bcrypt.compare(userData.pwd, userResponse.pwd);
            
            if (isPasswordValid) {
                console.log(userResponse.dataValues)
                const { pwd, ...user} = userResponse.dataValues;
                const xsrfToken = crypto.randomBytes(64).toString('hex');
                const token = jwt.sign(
                    { 
                        id: user.idUser, 
                        username: user.userName,
                        xsrfToken
                    }, 
                    SECRET_KEY, 
                    { 
                        expiresIn: '1h',
                    });
              
                return {
                    user,
                    token
                };
            } else {
                throw new Error('Mauvais mot de passe !');
            }
        } else {
            throw new Error('Mauvaise adresse mail !');
        }
    }
}

module.exports = UserService;