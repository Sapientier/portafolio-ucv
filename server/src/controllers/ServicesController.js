const Service = require('../models/Service');
const Subscriber = require('../models/Subscriber');
const nodemailer = require('nodemailer');
const config = require('../config');
const fs = require('fs')

module.exports = {
    async insertservices(req, res) {
        try {
            var newpath = "";
            if (req.file != null) {
                newpath = req.file.path.substring(7);
            }
            const task = new Service({
                name: req.body.name,
                category: req.body.category,
                autor: req.body.autor,
                date: req.body.date,
                imageService: newpath,
                school: req.body.school,
                institute: req.body.institute,
                userspp: req.body.userspp,
                description: req.body.description,
                request: req.body.request,
                paramserv: req.body.paramserv,
                direction: req.body.direction,
                approve: req.body.approve
            });

            const user = await task.save();

            res.json(user.toJSON());
        } catch (err) {
            res.status(400).send({
                error: 'Error en la inserción de datos de servicios.'
            })
        }
    },
    async updateservices(req, res) {
        try {
            var newpath = "";
            if (req.file == null) {
                newpath = req.body.imageService;
            }
            else {
                const newpathdel = "public/" + req.body.imageService;
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
                category: req.body.category,
                autor: req.body.autor,
                date: req.body.date,
                imageService: newpath,
                school: req.body.school,
                institute: req.body.institute,
                userspp: req.body.userspp,
                description: req.body.description,
                request: req.body.request,
                paramserv: req.body.paramserv,
                direction: req.body.direction,
                approve: req.body.approve,
            };
            const user = await Service.findByIdAndUpdate(req.body._id, newTask, { new: true });
            res.json(user.toJSON());
        } catch (err) {
            res.status(400).send({
                error: 'Error en la inserción de datos.'
            })
        }
    },
    async getservices(req, res) {
        try {
            const services = await Service.find();
            res.json(services);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los servicios'
            })
        }
    },
    async deleteservices(req, res) {
        try {
            await Service.findByIdAndDelete(req.body._id);
            if (req.body.imageService != "") {
                const newpath = "public/" + req.body.imageService;
                fs.unlink(newpath, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
            res.json("Eliminado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al eliminar los usuarios'
            })
        }
    },
    async getuniservicebycat(req, res) {
        try {
            const services = await Service.find({ category: req.body.category });
            res.json(services);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los servicios'
            })
        }
    },
    async getuniservicebyname(req, res) {
        try {
            const services = await Service.find({ name: { $regex: '.*' + req.body.name + '.*' } }).limit(5);
            res.json(services);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los servicios'
            })
        }
    },
    async suscribeservices(req, res) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.authentication.email,
                pass: config.authentication.password
            }
        });

        var mailOptions = {
            from: '"Portafolio Digital UCV" <portafolioucv@gmail.com>',
            to: req.body.email,
            subject: 'Suscripción realizada',
            html: '<html><body>Usted se encuentra suscrito a todos los servicios de la Facultad de Ciencias.<br><br> Correo automático. Por favor no responder.</body></html>'
        };

        try {
            const correo = await Subscriber.findOne({
                'email': req.body.email
            });

            if (correo) {
                return res.status(403).send({
                    error: 'El correo electronico ingresado ya existe.'
                })
            }

            const task = new Subscriber({
                email: req.body.email,
                typeSub: req.body.typeSub,
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
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar las suscripciones'
            })
        }
    }
}