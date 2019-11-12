const User = require('../models/User');

module.exports = {
    async register (req, res) {
        try {
            const { email, password } = req.body;
            const task = new User({
                email: email,
                password: password
            });
            const user = await task.save();
            res.json(user.toJSON());
        } catch (err) {
            res.status(400).send({
                error: 'Esta cuenta de correo ya esta en uso.'
            })
        }
    },
    async login (req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                'email': email
            });

            if(!user) {
                return res.status(403).send({
                   error: 'El correo electronico ingresado es incorrecto' 
                })
            }

            const isPasswordValid = password === user.password;
            if(!isPasswordValid) {
                return res.status(403).send({
                    error: 'La contraseña ingresada es incorrecta'
                })
            }
            
            const userJson = user.toJSON();
            res.send({
                user: userJson
            });
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error intentando iniciar sesión.'
            })
        }
    }
}
