const Subscriber = require('../models/Subscriber');
const Mailer = require('../controllers/MailController');
var moment = require('moment');
var fs = require('fs');

function setEmailContent(Title, Content, htmlText) {
    let finalText = htmlText;
    finalText = htmlText.replace("{{EmailSubject}}", Title);
    finalText = finalText.replace("{{Content}}", Content);

    return finalText;
}

module.exports = {
    async suscribeservices(req, res) {
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var descripcionMail = "";
        var typeSub = "";
        var catSub = [];
        var isSuscribed = false;
        var correoaux = {};

        try {
            if (req.body.typeSub !== "Unique") {
                let categories = "";
                typeSub = req.body.typeSub;
                catSub = req.body.catSub;
                catSub.forEach(cat => categories === "" ? categories = cat : categories = categories + ", " + cat);
                descripcionMail = "Usted se encuentra suscrito a los servicios de la Facultad de Ciencias en las siguientes categorías: <b>" + categories + "</b>";

                correoaux = await Subscriber.findOne({
                    emailSub: req.body.emailSub, typeSub: typeSub
                });

                if (correoaux) {
                    isSuscribed = true;
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
                        error: 'Ha ocurrido un error, el correo electronico ingresado ya esta suscrito a esta categoría de servicios.'
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

            var contents = fs.readFileSync('./src/templates/communications.html', 'utf8');

            var body = setEmailContent("Suscripción por Categorías", descripcionMail, contents);

            var mailOptions = {
                from: '"Portafolio Ciencias" <portafolioucv@gmail.com>',
                to: req.body.emailSub,
                subject: 'Suscripción exitosa',
                html: body
            };

            if (isSuscribed) {
                const task = {
                    dateSub: date,
                    catSub: catSub
                };
                const user = await Subscriber.findByIdAndUpdate(correoaux._id, task);
                res.json(user.toJSON());
            }
            else {
                if (req.body.typeSub !== "Unique") {
                    const task = new Subscriber({
                        emailSub: req.body.emailSub,
                        typeSub: typeSub,
                        dateSub: date,
                        catSub: catSub
                    });
                    const user = await task.save();
                    res.json(user.toJSON());
                }
                else {
                    const task = new Subscriber({
                        emailSub: req.body.emailSub,
                        typeSub: typeSub,
                        dateSub: date,
                        catSub: []
                    });
                    const user = await task.save();
                    res.json(user.toJSON());
                }
            }

            Mailer.sendMails(mailOptions);

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