const Subscriber = require('../models/Subscriber');
const Mailer = require('../controllers/MailController');
var moment = require('moment');

module.exports = {
    async suscribeservices(req, res) {
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var descripcionMail = "";
        var typeSub = "";

        try {
            if (req.body.typeSub === "Todo") {
                descripcionMail = "Usted se encuentra suscrito a todos los servicios de la Facultad de Ciencias."
                typeSub = req.body.typeSub
                const correoux = await Subscriber.findOne({
                    emailSub: req.body.emailSub, typeSub: typeSub
                });

                if (correoux) {
                    return res.status(403).send({
                        error: 'Ha ocurrido un error, el correo electronico ingresado ya esta suscrito a todos los servicios.'
                    })
                }
                else {
                    const correo = await Subscriber.findOne({
                        emailSub: req.body.emailSub
                    });
                    if (correo) {
                        await Subscriber.deleteMany({
                            email: req.body.emailSub
                        });
                    }
                }
            }
            else {
                descripcionMail = "Usted se encuentra suscrito al servicio: <b>" + req.body.serviceName + "</b>"
                typeSub = req.body.serviceId
                const correoaux = await Subscriber.findOne({
                    emailSub: req.body.emailSub, typeSub: "Todo"
                });

                if (correoaux) {
                    return res.status(403).send({
                        error: 'Ha ocurrido un error, el correo electronico ingresado ya esta suscrito a todos los servicios.'
                    })
                }
                else {
                    const correo = await Subscriber.findOne({
                        emailSub: req.body.emailSub, typeSub: typeSub
                    });
                    if (correo) {
                        return res.status(403).send({
                            error: 'Ha ocurrido un error, el correo electronico ingresado ya esta suscrito a este servicio.'
                        })
                    }
                }
            }

            var mailOptions = {
                from: '"Portafolio Ciencias" <portafolioucv@gmail.com>',
                to: req.body.emailSub,
                subject: 'Suscripción realizada',
                html: '<html><body>' + descripcionMail + '<br><br> Correo automático. Por favor no responder.</body></html>'
            };

            const task = new Subscriber({
                emailSub: req.body.emailSub,
                typeSub: typeSub,
                dateSub: date
            });

            const user = await task.save();

            Mailer.sendMails(mailOptions);

            res.json(user.toJSON());
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al suscribirse'
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
    },
    async getreportsusc(req, res) {
        try {
            var query = {};
            var suscriptions;

            if (req.body.emailSub !== '' && req.body.emailSub !== undefined) {
                query['emailSub'] = { $regex: '.*' + req.body.emailSub + '.*' };
            }
            if (req.body.dateSub !== '' && req.body.dateSub !== undefined) {
                query['dateSub'] = moment(req.body.dateSub, "DD/MM/YYYY").format("YYYY-MM-DDT00:00:00.000+00:00");
            }

            if (Object.keys(query).length === 0) {
                suscriptions = await Subscriber.find();
            }
            else {
                suscriptions = await Subscriber.find(query);
            }

            res.json(suscriptions);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar las suscripciones'
            })
        }
    }
}