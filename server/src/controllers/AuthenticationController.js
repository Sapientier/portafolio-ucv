const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const task = new User({
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
                isActive: req.body.isActive,
                Dependencies: req.body.Dependencies
            });

            const user = await task.save();
            res.json(user.toJSON());
        } catch (err) {
            res.status(400).send({
                error: 'Error en la inserción de datos'
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

            const isPasswordValid = await user.comparePassword(password);
            
            if(!isPasswordValid) {
                return res.status(403).send({
                    error: 'La contraseña ingresada es incorrecta'
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
