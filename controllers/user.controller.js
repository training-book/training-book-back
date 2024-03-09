const userService = require('../services/user.service');
const userSchema = require('../validations/user.validation');
class UserController {

    static async signup(req, res) {
        const { error } = userSchema.signupSchema.validate(req.body);

        if (!error) {
            try {
                const newUser = await userService.createUser(req.body);
                if (newUser) {
                    res.status(201).send({ message: "Nouvel utilisateur " + newUser.userName + " créer avec succès !" });
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
}

module.exports = UserController;