const UserService = require('../services/user.service');
const userService = require('../services/user.service');
const userSchema = require('../validations/user.validation');
class UserController {

    static async signup(req, res) {
        const { error } = userSchema.signupSchema.validate(req.body);

        if (!error) {
            try {
                const newUser = await userService.createUser(req.body);
                if (newUser) {
                    res.status(201).send({ message: "Merci " + newUser.userName + " ! Consulte ta boite mail pour finaliser ton inscription." });
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        } else {
            res.status(400).send(error.details[0])
        }
    }

    static async authenticate(req, res) {
        const { error } = userSchema.loginSchema.validate(req.body);
        if (!error) {
            try {
                console.log("23 :", error)
                const userData = req.body;
                const authenticateResponse = await userService.login(userData);
                if (authenticateResponse) {
                    // res.cookie("access_token", authenticateResponse.token, 
                    // {
                    //     httpOnly : false,
                    //     maxAge : new Date(Date.now() + 3600000),
                    //     sameSite: "Lax"
                    // }
                    // )
                    res.json(authenticateResponse);
                }

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(400).send(error.details[0])
        }
    }

    static async validateMail(req, res){
        const { token } = req.params;
        try {
            const validateMailResponse = await UserService.validateMail(token);
            if(validateMailResponse){
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
        } catch (error){
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

module.exports = UserController;