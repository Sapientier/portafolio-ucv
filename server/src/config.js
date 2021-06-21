// Lectura de valores de variables de entorno
require('dotenv').config();

// Configuraciones del servidor
module.exports = {
    port: process.env.PORT || 8000,
    db: {
        URI: process.env.DB_CONNECTION_STRING,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET,
        email: process.env.NOTIFIER_EMAIL_ADDRESS,
        password: process.env.NOTIFIER_EMAIL_PASSWORD
    }
}