require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {

    static async createUser(userData) {

        const existingUser = await userModel.findOne({ where: { mail: userData.mail } });

        if (existingUser) {
            throw new Error('User already exists with this email');
        } else {

            const hashedPassword = await bcrypt.hash(userData.pwd, 10);

            const newUser = await userModel.create({
                ...userData,
                pwd: hashedPassword
            });

            if (newUser) {
                return newUser;
            }
        }
    }

    static async login(userData) {

        const user = await userModel.findOne({ where: { mail: userData.mail } });

        if (user) {
            const isPasswordValid = await bcrypt.compare(userData.pwd, user.pwd);

            if (isPasswordValid) {
                const token = jwt.sign({ id: user.idUser, username: user.userName }, SECRET_KEY, { expiresIn: '1h' });
                return token;
            } else {
                throw new Error('Authentication failed. Wrong password.');
            }
        } else {
            throw new Error('Authentication failed. Wrong mail.');
        }
    }
}

module.exports = UserService;