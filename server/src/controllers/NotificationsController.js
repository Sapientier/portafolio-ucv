const Notification = require('../models/Notification');
const Subscriber = require('../models/Subscriber');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = {
    async insertnotifications(req, res) {
        try {
            // Inserción de las notificaciones
            const emails = [];
            var descripcion = "";
            const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            
            if(req.body.approve === true){
                descripcion = "Aprobado: " + req.body.name;
            }
            else{
                descripcion = "No aprobado: " + req.body.name;
            }
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
                title: "Nuevo Servicio",
                description: descripcion,
                dateNoti: date,
                owner: req.body.email
            });

            const notificacion = await task.save();

            // Se notifica a los suscriptores
            if(req.body.approve === true) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: config.authentication.email,
                        pass: config.authentication.password
                    }
                });

                var emailsSubs = "";
                var aux = 0;
                const correosSubs = await Subscriber.find();

                for (const element of correosSubs) {
                    if(aux === 0){
                        emailsSubs = element.email;
                        aux++;
                    }
                    else {
                        emailsSubs = emailsSubs + ", " + element.email;
                    }
                }

                var mailOptions = {
                    from: '"Portafolio Digital UCV" <portafolioucv@gmail.com>',
                    to: emailsSubs,
                    subject: 'Nuevo servicio disponible',
                    html: '<html><body>Servicio <b>' + req.body.name + '</b> en la categoría <b>' + req.body.category + '</b>.<br><br> Correo automático. Por favor no responder.</body></html>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Correo enviado: ' + info.response);
                    }
                });
            }

            res.json(notificacion.toJSON());
        } catch (err) {
            console.log(err);
        }
    },
    async getnotifications(req, res) {
        try {
            const notifications = await Notification.find({
                'emailsToNoti': { $in: req.body.email }
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
    }
}