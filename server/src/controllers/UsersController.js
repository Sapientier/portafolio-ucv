const User = require('../models/User');
const generatePassword = require('password-generator');
const nodemailer = require('nodemailer');
const config = require('../config');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const SALT_WORK_FACTOR = 8;

module.exports = {
    async insertusers (req, res) {
        var password = generatePassword(12, false);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.authentication.email,
                pass: config.authentication.password
            }
        });

        var mailOptions = {
            from: '"Portafolio UCV" <ciens@ciens.ucv.ve>',
            to: req.body.email,
            subject: 'Portafolio de Servicios UCV - Creación de Usuario',
            text: 'Su contraseña es: ' + password
        };

        try {
            const task = new User({
                email: req.body.email,
                password: password,
                isAdmin: req.body.isAdmin,
                isActive: req.body.isActive,
                dependencies: req.body.Dependencies
            });

            const user = await task.save();
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo enviado: ' + info.response);
                }
            });
            res.json(user.toJSON());
        } catch (err) {
            res.status(400).send({
                error: 'Error en la inserción de datos.'
            })
        }
    },
    async getusers (req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los usuarios'
            })
        }
    },
    async getuserpass (req, res) {
        try {
            const user = await User.findOne({
                'email': req.body.email
            });

            const isPasswordValid = await user.comparePassword(req.body.password);

            if(!isPasswordValid) {
                return res.status(403).send({
                    error: 'La contraseña actual ingresada no coincide con su usuario'
                })
            }
            res.json(user);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error intentando comprobar la contraseña.'
            })
        }
    },
    async updateusers (req, res) {
        try {
            const newTask = {
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                isActive: req.body.isActive,
                dependencies: req.body.Dependencies
            };
            await User.findByIdAndUpdate(req.body._id, newTask);
            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al actualizar los usuarios'
            })
        }
    },
    async modpass (req, res) {
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        var hash = bcrypt.hashSync(req.body.password, salt);

        try {
            const newTask = {
                password: hash
            };
            await User.findByIdAndUpdate(req.body._id, newTask);
            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al actualizar la contraseña'
            })
        }
    },
    async deleteusers (req, res) {
        try {
            await User.findByIdAndDelete(req.body._id);
            res.json("Eliminado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al eliminar los usuarios'
            })
        }
    },
    async resetpass (req, res) {
        var password = generatePassword(12, false);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.authentication.email,
                pass: config.authentication.password
            }
        });

        var mailOptions = {
            from: '"Portafolio UCV" <ciens@ciens.ucv.ve>',
            to: req.body.email,
            subject: 'Portafolio de Servicios UCV - Reinicio de contraseña',
            text: 'Su nueva contraseña es: ' + password
        };

        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        var hash = bcrypt.hashSync(password, salt);

        try {
            const newTask = {
                password: hash
            };
            await User.findByIdAndUpdate(req.body._id, newTask);
            transporter.sendMail(mailOptions, function(error, info){
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