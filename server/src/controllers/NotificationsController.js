const Notification = require('../models/Notification');
const User = require('../models/User');

module.exports = {
    async insertnotifications(req, res) {
        try {
            const emails = [];
            var descripcion = "";
            const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

            if(req.body.approve == "true"){
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