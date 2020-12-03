const Subscriber = require('../models/Subscriber');
const Mailer = require('../controllers/MailController');

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
                    email: req.body.email, typeSub: typeSub
                });

                if (correoux) {
                    return res.status(403).send({
                        error: 'Ha ocurrido un error, el correo electronico ingresado ya esta suscrito a todos los servicios.'
                    })
                }
                else {
                    const correo = await Subscriber.findOne({
                        email: req.body.email
                    });
                    if (correo) {
                        await Subscriber.deleteMany({
                            email: req.body.email
                        });
                    }
                }
            }
            else {
                descripcionMail = "Usted se encuentra suscrito al servicio: <b>" + req.body.serviceName + "</b>"
                typeSub = req.body.serviceId
                const correoaux = await Subscriber.findOne({
                    email: req.body.email, typeSub: "Todo"
                });

                if (correoaux) {
                    return res.status(403).send({
                        error: 'Ha ocurrido un error, el correo electronico ingresado ya esta suscrito a todos los servicios.'
                    })
                }
                else {
                    const correo = await Subscriber.findOne({
                        email: req.body.email, typeSub: typeSub
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
                to: req.body.email,
                subject: 'Suscripción realizada',
                html: '<html><body>' + descripcionMail + '<br><br> Correo automático. Por favor no responder.</body></html>'
            };

            const task = new Subscriber({
                email: req.body.email,
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
    }
}