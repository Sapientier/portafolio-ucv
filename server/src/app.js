const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const URI = 'mongodb+srv://Sapientier:portafolio-ucv@portafolio-bd-3ovqh.mongodb.net/test?retryWrites=true&w=majority';

// Conexión a la BD en la Nube Cloud Atlas
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB conectada"))
    .catch(err => console.error(err));

// Middlewares -- Bloques de código que se ejecutan entre la petición que hace el usuario (request) hasta que la petición llega al servidor
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Rutas
app.use('/tasks', require('./routes/tasks'));

// Configuraciones del servidor
app.set('port', process.env.PORT || 8000); // Que tome por defecto el puerto que se brinde donde esté desplegada la app, sino el 8000

// Inicialización del servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor inicializado en el puerto ${app.get('port')}`);
});