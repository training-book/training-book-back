const AuthService = require('../services/auth.service');
const userSchema = require('../validations/user.validation');

class AuthController {

    static async signup(req, res) {
        const { error } = userSchema.signupSchema.validate(req.body);

        if (!error) {
            try {
                const newUserResponse = await AuthService.createUser(req.body);
                if (!newUserResponse.error) {
                    res.status(201).send({ message: "Merci " + newUserResponse.userName + " ! Consulte ta boite mail pour finaliser ton inscription." });
                }else {
                    res.status(400).send({error : newUserResponse.error})
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        } else {
            res.status(400).send({ error: "Une erreur s'est produite." });
        }
    }

    static async authenticate(req, res) {
        const { error } = userSchema.loginSchema.validate(req.body);
        if (!error) {
            try {
                const userData = req.body;
                const authenticateResponse = await AuthService.login(userData);
                res.json(authenticateResponse);

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
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(400).send({error : "Vous avez fait une erreur dans votre adresse e-mail ou votre mot de passe."})
        }
    }

    static async validateMail(req, res) {
        const { token } = req.params;
        try {
            const validateMailResponse = await AuthService.validateMail(token);
            if (validateMailResponse) {
                console.log(validateMailResponse)
                res.status(200).send(`
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
            res.status(500).send(
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