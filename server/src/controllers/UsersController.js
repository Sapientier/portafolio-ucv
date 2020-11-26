const User = require('../models/User');
const generatePassword = require('password-generator');
const nodemailer = require('nodemailer');
const config = require('../config');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const fs = require('fs')
const SALT_WORK_FACTOR = 8;

module.exports = {
    async insertusers(req, res) {
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
            subject: 'Creación de usuario',
            html: '<html><body>Su usuario es: <b>' + req.body.email + '</b><br>Su contraseña es: <b>' + password + '</b><br><br> Correo automático. Por favor no responder.</body></html>'
        };

        try {
            const task = new User({
                email: req.body.email,
                password: password,
                isAdmin: req.body.isAdmin,
                isActive: req.body.isActive,
                dependencies: req.body.dependencies,
                numNoti: 0
            });

            const user = await task.save();
            transporter.sendMail(mailOptions, function (error, info) {
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
    async getusers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los usuarios'
            })
        }
    },
    async getuserpass(req, res) {
        try {
            const user = await User.findOne({
                '_id': req.body._id
            });

            const isPasswordValid = await user.comparePassword(req.body.password);

            if (!isPasswordValid) {
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
    async getuserper(req, res) {
        try {
            const user = await User.findOne({
                '_id': req.body._id
            });
            res.json(user);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar el usuario'
            })
        }
    },
    async updateusers(req, res) {
        try {
            const newTask = {
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                isActive: req.body.isActive,
                dependencies: req.body.dependencies
            };
            await User.findByIdAndUpdate(req.body._id, newTask);
            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al actualizar los usuarios'
            })
        }
    },
    async updateuserper(req, res) {
        try {
            var newpath = "";
            const user = await User.findOne({
                '_id': req.body._id
            });
        
            if (req.file === undefined) {
                newpath = user.imageUser;
            }
            else {
                const newpathdel = "public/" + user.imageUser;
               
                fs.unlink(newpathdel, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
                newpath = req.file.path.substring(7);
            }
            const newTask = {
                name: req.body.name,
                lastname: req.body.lastname,
                school: req.body.school,
                institute: req.body.institute,
                imageUser: newpath
            };
            await User.findByIdAndUpdate(req.body._id, newTask);
            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al actualizar el perfil'
            })
        }
    },
    async updateusernoti(req, res) {
        try {
            const newTask = {
                numNoti: req.body.numnoti
            };
            await User.findByIdAndUpdate(req.body._id, newTask);
            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al actualizar el número de notificaciones'
            })
        }
    },
    async modpass(req, res) {
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
    async deleteusers(req, res) {
        try {
            await User.findByIdAndDelete(req.body._id);
            res.json("Eliminado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al eliminar los usuarios'
            })
        }
    },
    async resetpass(req, res) {
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
            await User.findByIdAndUpdate(req.body._id, newTask);
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