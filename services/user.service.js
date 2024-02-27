const userModel = require('../models/user.model');
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
}

module.exports = UserService;