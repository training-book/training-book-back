require('dotenv').config();
const crypto = require('crypto');
const SECRET_KEY = process.env.JWT_SECRET;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PWD = process.env.GMAIL_PWD;
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

class UserService {

    static async changePassword(idUser, lastPassword, newPassword) {

        if (lastPassword == newPassword) {
            return { error: 'Le nouveau mot de passe ne peut pas être le même que le mot de passe existant.' };
        } else {
            const userResponse = await userModel.findOne({ where: { idUser: idUser } });
            const isPasswordValid = await bcrypt.compare(lastPassword, userResponse.password);

            if (isPasswordValid) {
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);

                const userUpdated = await userModel.update(
                    {
                        password: hashedNewPassword
                    },
                    {
                        where: {
                            idUser: idUser
                        }
                    });

                return userUpdated;
            } else {
                return { error: 'Vous n\'avez pas entrer le bon mot passe !' };
            }
        }

    }

}

module.exports = UserService;