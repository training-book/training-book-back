const AppError = require('../AppError');
const AuthService = require('../services/auth.service');
const userSchema = require('../validations/user.validation');
const errorCodes = require('./../constants/errorCodes');
const AppSuccess = require('./../AppSuccess');
const sendSuccessResponse = require('./../utils/sendSuccessResponse')
class AuthController {

    static async signup(req, res, next) { 
        try {
            const { error } = userSchema.signupSchema.validate(req.body);
            if(!error){
                const newUserResponse = await AuthService.signup(req.body);
                const successReponse = new AppSuccess(602, 201, 'Creation of new user succesfull.',{
                    newUser : { 
                        userName : newUserResponse.userName
                    }
                });
                sendSuccessResponse(res, successReponse);
                // res.status(201);
                // res.send({ message: "Merci " + newUserResponse.userName + " ! Consulte ta boite mail pour finaliser ton inscription." });
            }else{
                throw new AppError(errorCodes.USER_INVALID_FORM, 'Validation error.', 400);
            }
        } catch (error) {
            next(error)
        }
    }

    static async authenticate(req, res, next) {
        const { error } = userSchema.loginSchema.validate(req.body);
        if (!error) {
            try {
                const userData = req.body;
                const authenticateResponse = await AuthService.login(userData);
                const successResponse = new AppSuccess(600,200,'Authentication succesfull.', authenticateResponse);
                
                sendSuccessResponse(res, successResponse);
                // res.json(successReponse);

                // if (authenticateResponse) {
                //     // res.cookie("access_token", authenticateResponse.token, 
                //     // {
                //     //     httpOnly : false,
                //     //     maxAge : new Date(Date.now() + 3600000),
                //     //     sameSite: "Lax"
                //     // }
                //     // )
                // }
            } catch (error) {
                res.status(500);
                res.json({ error: error.message });
            }
        } else {
            res.status(400);
            res.send({error : "Vous avez fait une erreur dans votre adresse e-mail ou votre mot de passe."})
        }
    }

    static async validateMail(req, res) {
        const { token } = req.params;
        try {
            const validateMailResponse = await AuthService.validateMail(token);
            console.log('ligne : ',60, ' ', validateMailResponse)
            if (validateMailResponse) {
                console.log('62 : ', validateMailResponse)
                res.status(200);
                res.send(`
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                <meta charset="UTF-8">
                <title>Confirmation</title>
                <link rel="stylesheet" href="style.css">
                </head>
                <body>
                <div class="error-message">
             
        
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        .success-message {
                            background-color: #f2fbe79c;
                            color: #388c38;
                            border-left: 6px solid #f2fbe7;
                            padding: 12px;
                            margin: 20px 0;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="success-message">
                    <h2> Adresse mail confirmer !</h2>
                    <p>Merci de vous être inscrit. Vous pouvez maintenant vous connecter.</p>
                    </div>
                </body>
                </html>


               
                `)
            }
        } catch (error) {
            console.log('error validate : ', error)
            res.status(500);
            res.send(
                `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        .error-message {
                            background-color: #ffdddd;
                            color: #d8000c;
                            border-left: 6px solid #d8000c;
                            padding: 12px;
                            margin: 20px 0;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="error-message">
                        <p>Une erreur est survenue. Veuillez réessayer plus tard.</p>
                    </div>
                </body>
                </html>
                

                `
            )
        }
    }

}

module.exports = AuthController;