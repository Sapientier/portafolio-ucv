const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Mailer = require('../controllers/MailController');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const generatePassword = require('password-generator');
const fs = require('fs');
const SALT_WORK_FACTOR = 8;

function setEmailContent(Title, Content, htmlText) {
    let finalText = htmlText;
    finalText = htmlText.replace("{{EmailSubject}}", Title);
    finalText = finalText.replace("{{Content}}", Content);

    return finalText;
}

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

        var descripcionMail = 'Su nueva contraseña es: <b>' + password + '</b>';

        var contents = fs.readFileSync('./src/templates/communications.html', 'utf8');

        var body = setEmailContent("Reinicio de contraseña", descripcionMail, contents);

        var mailOptions = {
            from: '"Portafolio Ciencias UCV" <portafolio.ciencias.ucv@hotmail.com>',
            to: req.body.email,
            subject: 'Reinicio exitoso',
            html: body,
            attachments: [{
                filename: 'UCV.png',
                path: 'src/templates/UCV.png',
                cid: 'UCV@portafolio.app'
            },
            {
                filename: 'ciencia.png',
                path: 'src/templates/ciencia.png',
                cid: 'ciencia@portafolio.app'
            }]
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

            Mailer.sendMails(mailOptions);

            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al reiniciar la contraseña'
            })
        }
    }
}
