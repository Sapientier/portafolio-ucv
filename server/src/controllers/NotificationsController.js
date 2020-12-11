const Notification = require('../models/Notification');
const Subscriber = require('../models/Subscriber');
const User = require('../models/User');
const Mailer = require('../controllers/MailController');
var moment = require('moment');

module.exports = {
    async insertnotifications(req, res) {
        try {
            // Inserción de las notificaciones
            const emails = [];
            var descripcion = "";
            var titulo = "";
            const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 10);

            if (req.body.approve === true)
                descripcion = "Aprobado: " + req.body.name;
            else
                descripcion = "No aprobado: " + req.body.name;

            if (req.body.isUpdate === true)
                titulo = "Actualización de Servicio";
            else
                titulo = "Nuevo Servicio";

            const usersNoti = await User.find({
                '_id': { $ne: req.body.id }
            });

            for (const element of usersNoti) {
                emails.push(element.email);
                const newTask = {
                    numNoti: (element.numNoti + 1)
                };
                await User.findByIdAndUpdate(element._id, newTask);
            }

            const task = new Notification({
                emailsToNoti: emails,
                typeNoti: "Service",
                title: titulo,
                description: descripcion,
                dateNoti: date,
                owner: req.body.email
            });

            const notificacion = await task.save();

            // Se notifica a los suscriptores
            if (req.body.approve === true) {
                var emailsSubs = "";
                var aux = 0;
                var correosSubs = "";

                if (req.body.isUpdate === true) {
                    descripcion = "Servicio actualizado";
                    correosSubs = await Subscriber.find({
                        $or: [{ typeSub: "Todo" }, { typeSub: req.body.serviceId }]
                    });
                }
                else {
                    descripcion = "Nuevo servicio disponible";
                    correosSubs = await Subscriber.find({
                        typeSub: "Todo"
                    });
                }

                for (const element of correosSubs) {
                    if (aux === 0) {
                        emailsSubs = element.emailSub;
                        aux++;
                    }
                    else {
                        emailsSubs = emailsSubs + ", " + element.emailSub;
                    }
                }

                var mailOptions = {
                    from: '"Portafolio Ciencias" <portafolioucv@gmail.com>',
                    to: emailsSubs,
                    subject: descripcion,
                    html: '<html><body>Servicio <b>' + req.body.name + '</b> en la categoría <b>' + req.body.category + '</b>.<br><br> Correo automático. Por favor no responder.</body></html>'
                };

                Mailer.sendMails(mailOptions);
            }

            res.json(notificacion.toJSON());
        } catch (err) {
            console.log(err);
        }
    },
    async getnotifications(req, res) {
        try {
            const notifications = await Notification.find({
                'emailsToNoti': { $in: req.query.email }
            });

            res.json(notifications);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar las notificaciones'
            })
        }
    },
    async deletenotifications(req, res) {
        try {
            await Notification.updateMany({}, {
                $pull: { emailsToNoti: { $in: req.body.email } },
            });

            res.json("Limpieza con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al limpiar notificaciones'
            })
        }
    },
    async getreportsnoti(req, res) {
        try {
            var query = {};
            var notifications;

            if (req.body.dateNoti !== '' && req.body.dateNoti !== undefined) {
                query['dateNoti'] = moment(req.body.dateNoti, "DD/MM/YYYY").format("YYYY-MM-DDT00:00:00.000+00:00");
            }
            if (req.body.descriptionNoti !== '' && req.body.descriptionNoti !== undefined) {
                query['descriptionNoti'] = { $regex: '.*' + req.body.descriptionNoti + '.*' };
            }
            if (req.body.owner !== '' && req.body.owner !== undefined) {
                query['owner'] = { $regex: '.*' + req.body.owner + '.*' };
            }
            if (req.body.title !== '' && req.body.title !== undefined) {
                query['title'] = { $regex: '.*' + req.body.title + '.*' };
            }
            
            if(Object.keys(query).length === 0){
                notifications = await Notification.find();
            }
            else {
                notifications = await Notification.find(query);
            }

            res.json(notifications);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar las notificaciones'
            })
        }
    }
}