const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const nodemailer = require('nodemailer');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const generatePassword = require('password-generator');
const SALT_WORK_FACTOR = 8;

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
    },
    async resetpassLogin(req, res) {
        var password = generatePassword(12, false);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.authentication.email,
                pass: config.authentication.password
            }
        });

        var mailOptions = {
            from: '"Portafolio Ciencias" <portafolioucv@gmail.com>',
            to: req.body.email,
            subject: 'Reinicio de contraseña',
            html: '<html><body>Su nueva contraseña es: <b>' + password + '</b><br><br> Correo automático. Por favor no responder.</body></html>'
        };

        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        var hash = bcrypt.hashSync(password, salt);

        try {
            const newTask = {
                password: hash
            };
            const user = await User.findOne({
                'email': req.body.email
            });

            if (!user) {
                return res.status(403).send({
                    error: 'El correo electronico ingresado no esta registrado.'
                })
            }

            await User.findByIdAndUpdate(user._id, newTask);

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo enviado: ' + info.response);
                }
            });

            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al actualizar los usuarios'
            })
        }
    }
}
