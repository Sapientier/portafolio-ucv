const Joi = require('@hapi/joi');

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        });

        const newTask = {
            email: req.body.email,
            password: req.body.password
        };
        
        const {error} = schema.validate(newTask);
       
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Debes ingresar una direccion de correo valida'
                    })
                    break;
                case 'password':
                    res.status(400).send({
                        error: `La contraseña ingresada no cumple con las siguientes reglas: 
                        <br>
                        1. Debe contener SOLO los siguientes caracteres: minusculas, mayusculas, numeros.
                        <br>
                        2. Debe tener al menos 8 y no mas de 32 caracteres de longitud.
                        `
                    })
                    break;
                default:
                    res.status(400).send({
                        error: 'Información de registro invalida'
                    })
            }
        } else {
            next()
        }
    }
}