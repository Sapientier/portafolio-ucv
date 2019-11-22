const User = require('../models/User');

module.exports = {
    async getusers (req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar los usuarios'
            })
        }
    },
    async updateusers (req, res) {
        try {
            const newTask = {
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                isActive: req.body.isActive,
                Dependencies: req.body.Dependencies
            };
            await User.findByIdAndUpdate(req.body._id, newTask);
            res.json("Actualizado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al actualizar los usuarios'
            })
        }
    },
    async deleteusers (req, res) {
        try {
            await User.findByIdAndDelete(req.body._id);
            res.json("Eliminado con exito");
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al eliminar los usuarios'
            })
        }
    }
}