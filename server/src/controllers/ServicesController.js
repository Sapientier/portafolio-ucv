const Service = require('../models/Service');
const fs = require('fs')
var moment = require('moment');

module.exports = {
    async insertservices(req, res) {
        try {
            var newpath = "";
            if (req.file !== undefined) {
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
            if (req.file === undefined) {
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
                error: 'Error en la actualización de datos.'
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

            if (req.body.imageService !== "") {
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
                error: 'Ha ocurrido un error al eliminar los servicios'
            })
        }
    },
    async getuniservicebycat(req, res) {
        try {
            const services = await Service.find({ category: req.body.category });
            res.json(services);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los servicios por categoría'
            })
        }
    },
    async getuniservicebyname(req, res) {
        try {
            const services = await Service.find({ name: { $regex: '.*' + req.body.name + '.*' } }).limit(5);
            res.json(services);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los servicios por nombre'
            })
        }
    },
    async getuniservicebyapproved(req, res) {
        try {
            const services = await Service.find({ approve: req.body.approve });
            res.json(services);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los servicios por aprobación'
            })
        }
    },
    async getreportserv(req, res) {
        try {
            var query = {};
            var services;

            if (req.body.approve !== '' && req.body.approve !== undefined) {
                query['approve'] = req.body.approve;
            }
            if (req.body.autor !== '' && req.body.autor !== undefined) {
                query['autor'] = { $regex: '.*' + req.body.autor + '.*' };
            }
            if (req.body.category !== '' && req.body.category !== undefined) {
                query['category'] = req.body.category;
            }
            if (req.body.date !== '' && req.body.date !== undefined) {
                query['date'] = moment(req.body.date, "DD/MM/YYYY").format("YYYY-MM-DDT00:00:00.000+00:00");
            }
            if (req.body.institute !== '' && req.body.institute !== undefined) {
                query['institute'] = req.body.institute;
            }
            if (req.body.name !== '' && req.body.name !== undefined) {
                query['name'] = { $regex: '.*' + req.body.name + '.*' };
            }
            if (req.body.school !== '' && req.body.school !== undefined) {
                query['school'] = req.body.school;
            }

            if (Object.keys(query).length === 0) {
                services = await Service.find();
            }
            else {
                services = await Service.find(query);
            }

            res.json(services);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los servicios'
            })
        }
    }
}