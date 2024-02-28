const userService = require('../services/user.service');

class UserController {

    static async signup(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            if(newUser){
                res.status(201).send({message : "New user " + newUser.userName + " is successfully created!"});
            }
        } catch (error) {
            console.log(error.message)
            res.status(500).send({ error: error.message });
        }
    }

    static async authenticate(req, res){
        const userData = req.body;
        try{
            const token = await userService.login(userData);
            if(token){
                res.json({token});
            }
        } catch (error){
            res.status(500).json({error : error.message});
        }
    }
}

module.exports = UserController;