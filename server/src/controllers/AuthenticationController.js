const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtSignUser (user) {
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: '12h'
    })
}

module.exports = {
    async login (req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                'email': email
            });

            if(!user) {
                return res.status(403).send({
                   error: 'El correo electronico ingresado es incorrecto.' 
                })
            }

            const isPasswordValid = await user.comparePassword(password);
            
            if(!isPasswordValid) {
                return res.status(403).send({
                    error: 'La contraseña ingresada es incorrecta.'
                })
            }
            if(user.isActive) {
                return res.status(403).send({
                    error: 'El usuario con el que intenta ingresar esta bloqueado.'
                })
            }
            
            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error intentando iniciar sesión.'
            })
        }
    }
}
