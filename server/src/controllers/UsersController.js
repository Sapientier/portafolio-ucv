const User = require('../models/User');
const generatePassword = require('password-generator');
const Mailer = require('../controllers/MailController');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const fs = require('fs');
const SALT_WORK_FACTOR = 8;

function setEmailContent(Title, Content, htmlText) {
    let finalText = htmlText;
    finalText = htmlText.replace("{{EmailSubject}}", Title);
    finalText = finalText.replace("{{Content}}", Content);

    return finalText;
}

module.exports = {
    async insertusers(req, res) {
        var password = generatePassword(12, false);

        var descripcionMail = 'Su usuario es: <b>' + req.body.email + '</b> y su contraseña es: <b>' + password + '</b>';

        var contents = fs.readFileSync('./src/templates/communications.html', 'utf8');

        var body = setEmailContent("Creación de usuario", descripcionMail, contents);

        var mailOptions = {
            from: '"Portafolio Ciencias" <portafolioucv@gmail.com>',
            to: req.body.email,
            subject: 'Creación exitosa',
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

        try {
            const task = new User({
                email: req.body.email,
                password: password,
                isAdmin: req.body.isAdmin,
                isActive: req.body.isActive,
                dependencies: req.body.dependencies,
                numNoti: 0,
                schoolUser: '',
                instituteUser: '',
                imageUser: '',
            });

            const user = await task.save();

            Mailer.sendMails(mailOptions);

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
                '_id': req.query._id
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
                schoolUser: req.body.school,
                instituteUser: req.body.institute,
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

        var descripcionMail = 'Su nueva contraseña es: <b>' + password + '</b>';

        var contents = fs.readFileSync('./src/templates/communications.html', 'utf8');

        var body = setEmailContent("Reinicio de contraseña", descripcionMail, contents);

        var mailOptions = {
            from: '"Portafolio Ciencias" <portafolioucv@gmail.com>',
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
            await User.findByIdAndUpdate(req.body._id, newTask);

            Mailer.sendMails(mailOptions);

            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al actualizar los usuarios'
            })
        }
    },
    async getreportsuser(req, res) {
        try {
            var query = {};
            var notifications;

            if (req.body.dependencies !== '' && req.body.dependencies !== undefined) {
                query['dependencies'] = req.body.dependencies;
            }
            if (req.body.email !== '' && req.body.email !== undefined) {
                query['email'] = { $regex: '.*' + req.body.email + '.*' };
            }
            if (req.body.instituteUser !== '' && req.body.instituteUser !== undefined) {
                query['instituteUser'] = req.body.instituteUser;
            }
            if (req.body.isActive !== '' && req.body.isActive !== undefined) {
                query['isActive'] = req.body.isActive;
            }
            if (req.body.isAdmin !== '' && req.body.isAdmin !== undefined) {
                query['isAdmin'] = req.body.isAdmin;
            }
            if (req.body.schoolUser !== '' && req.body.schoolUser !== undefined) {
                query['schoolUser'] = req.body.schoolUser;
            }

            if (Object.keys(query).length === 0) {
                notifications = await User.find();
            }
            else {
                notifications = await User.find(query);
            }

            res.json(notifications);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los usuarios'
            })
        }
    }
}