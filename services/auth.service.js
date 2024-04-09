require('dotenv').config();
const crypto = require('crypto');
const SECRET_KEY = process.env.JWT_SECRET;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PWD = process.env.GMAIL_PWD;
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const AppError = require('../AppError');
const errorCode = require('./../constants/errorCodes');
class AuthService {

    static async signup(userData) {

        const existingUserByMail = await userModel.findOne({ where: { mail: userData.mail } });
        const existingUserByUserName = await userModel.findOne({ where: { userName: userData.userName } });
        if (existingUserByMail) {
            // throw new AppError(errorCode.CONFLICT_EXISTING_MAIL,'Cette adresse mail est déjà utilisé !', 409);
            throw new AppError(errorCode.CONFLICT_EXISTING_MAIL,'E-mail are already used.', 409);
        } else if (existingUserByUserName) {
            throw new AppError(errorCode.CONFLICT_EXISTING_USERNAME,'UserName are already used.',409);
            // throw new AppError(errorCode.CONFLICT_EXISTING_USERNAME,'Ce pseudo est déjà utilisé !',409);
        } else {

            const hashedPassword = await bcrypt.hash(userData.password, 10);

            const newUser = await userModel.create({
                ...userData,
                password: hashedPassword
            });

            if (newUser) {
                const xsrfToken = crypto.randomBytes(64).toString('hex');
                const token = jwt.sign(
                    {
                        id: newUser.idUser,
                        username: newUser.userName,
                        xsrfToken
                    },
                    SECRET_KEY,
                    {
                        expiresIn: '1h',
                    });

                await userModel.update({ confirmationToken: token }, { where: { idUser: newUser.idUser } });
                console.log("32 : ", newUser)
                const confirmationUrl = `http://localhost:3000/auth/confirm/${token}`;

                this.sendMail(newUser, confirmationUrl);
                return newUser;
            }
        }
    }

    static async login(userData) {
        const userResponse = await userModel.findOne({ where: { mail: userData.mail } });

        if (userResponse) {
            if (userResponse.isVerified) {
                const isPasswordValid = await bcrypt.compare(userData.password, userResponse.password);

                if (isPasswordValid) {
                    console.log(userResponse.dataValues)
                    const { password, confirmationToken, isVerified, ...user } = userResponse.dataValues;
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
                throw new Error('Vous n\'avez pas valider votre adresse mail !')
            }
        } else {
            throw new Error('Vous avez fait une erreur dans votre adresse e-mail ou votre mot de passe.');
        }
    }

    static async sendMail(newUser, confirmationUrl) {

        nodemailer.createTestAccount((err, account)=> {
            if(err){
                console.error('Failed to create a testing ccount, ' + err.message);
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            //Create a SMTP transporter object

            const transporter = nodemailer.createTransport({
                // service: "Gmail",
                // host: "smtp.gmail.com",
                // secureConnection: true,
                // port: 587,
                // tls: {
                //     ciphers: "SSLv3",
    
                // },
                // auth: {
                //     user: GMAIL_USER,
                //     pass: GMAIL_PWD
                // }
                host: account.smtp.host,
                port : account.smtp.port,
                secure : account.smtp.secure,
                auth : {
                    user : account.user,
                    pass : account.pass
                }               
            });
    
            const mailHTML = `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
            <meta charset="UTF-8">
            <title>Confirmation d'Email</title>
            </head>
            <body>
            <div style="max-width: 600px; margin: 20px auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #0366d6;">Bienvenue !</h2>
            <p>Merci ${newUser.firstName} de vous être inscrit. Veuillez cliquer sur le lien ci-dessous pour confirmer votre adresse email :</p>
            <a href="${confirmationUrl}" style="display: inline-block; background-color: #0366d6; color: white; padding: 10px 20px; margin: 10px 0; border-radius: 5px; text-decoration: none;">Confirmer l'Email</a>
            <p>Si vous n'avez pas demandé ce compte, veuillez ignorer cet email.</p>
            </div>
            </body>
            </html>
    
            `;
    
            const mailOptions = {
                // from: GMAIL_USER,
                from : 'Sender Name <sender@example.com>',
                // to: 'Recipient <recipent@example.com>',
                to: newUser.mail,
                subject: "Création de compte",
                html: mailHTML
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error nodemailer : ", error);
                    return process.exit(1);
                } else {
                    console.log('succes nodemailer : e-mail envoyer', info.response);
                    console.log('Message sent: %s', info.messageId);

                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                }
            })
        })

    }

    static async validateMail(token) {
        console.log('169, token : ',token)
        const decoded = await jwt.verify(token, SECRET_KEY);
        console.log('decoded : ',decoded)
        if(decoded){
            
            const userUpdated = await userModel.update({ isVerified: 1 }, { where: { idUser: decoded.id } });
            return userUpdated[0];
        }

    }

}

module.exports = AuthService;