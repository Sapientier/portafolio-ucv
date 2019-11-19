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
    }
}