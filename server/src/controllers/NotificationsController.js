const Notification = require('../models/Notification');

module.exports = {
    async insertnotifications(emails, tipo, titulo, descripcion, fecha) {
        try {
            const task = new Notification({
                emailsToNoti: emails,
                typeNoti: tipo,
                title: titulo,
                description: descripcion,
                dateNoti: fecha
            });

            const notificacion = await task.save();
            return notificacion;
        } catch (err) {
            console.log(err);
        }
    },
    async getservices(req, res) {
        try {
            const notifications = await Notification.find();
            res.json(notifications);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los servicios'
            })
        }
    },
}