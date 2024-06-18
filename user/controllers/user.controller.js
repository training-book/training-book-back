const UserService = require('../services/user.service');
const userSchema = require('../validations/user.validation');

class userController {

    static async changePassword(req, res) {
        const { error } = userSchema.changePasswordSchema.validate(req.body);

        if (!error) {
            try {
                const idUser = req.idUser;
                const lastPassword = req.body.lastPassword;
                const newPassword = req.body.newPassword;
                const responseChangepassword = await UserService.changePassword(idUser, lastPassword, newPassword);
                if (!responseChangepassword.error) {
                    res.status(200).json({ message: "Mot de passe modifier avec succées !" });
                } else {
                    res.status(400).json({ message: responseChangepassword.error });
                }

            } catch (error) {
                res.status(500).send({ error: "Une erreur s'est produite." });
            }
        } else {
            res.status(400).send({ error: "Votre mot de passe doit contenir au moins un caractère spécial, une lettre majuscule et une lettre minuscule." });
        }

    }
}

module.exports = userController;