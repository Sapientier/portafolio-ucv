// Configuraciones del servidor
module.exports = {
    port: process.env.PORT || 8000,
    db: {
        URI: 'mongodb+srv://Sapientier:portafolio-ucv@portafolio-bd-3ovqh.mongodb.net/test?retryWrites=true&w=majority',
        database: process.env.DB_NAME || 'portafolio-bd',
        user: process.env.DB_USER || 'Sapientier',
        password: process.env.DB_PASS || 'portafolio-ucv',
        options: { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}