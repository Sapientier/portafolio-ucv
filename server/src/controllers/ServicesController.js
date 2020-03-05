const Service = require('../models/Service');

module.exports = {
    async insertservices(req, res) {
        try {
            const newpath = req.file.path.substring(7);
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
                direction: req.body.direction
            });

            const user = await task.save();
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
}