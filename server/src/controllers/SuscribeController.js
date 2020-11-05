const Subscriber = require('../models/Subscriber');
const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = {
    async suscribeservices(req, res) {
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

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
                dateSub: date
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
    },
    async getsuscribers(req, res) {
        try {
            const subscribers = await Subscriber.find();
            res.json(subscribers);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los suscriptores'
            })
        }
    }
}