const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');

// Conexión a la BD en la Nube Cloud Atlas
mongoose.connect(config.db.URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("DB conectada"))
    .catch(err => console.error(err));

// Middlewares -- Bloques de código que se ejecutan entre la petición que hace el usuario (request) hasta que la petición llega al servidor
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Rutas
require('./routes')(app)

// Inicialización del servidor
app.listen(config.port, () => {
    console.log(`Servidor inicializado en el puerto ${config.port}`);
});