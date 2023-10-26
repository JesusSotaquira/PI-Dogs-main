// Configurando las variables de entorno del archivo .env.
require('dotenv').config();

// Importando paquetes necesarios para el servidor.
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Importando las rutas desde el archivo de rutas.
const routes = require('./routes/index.js');

// Importando la conexión a la base de datos.
require('./db.js');

// Creando la instancia del servidor Express.
const server = express();

// Dándole un nombre al servidor.
server.name = 'API';

// Configurando middlewares que se ejecutarán antes de las rutas.

// Parsea los datos del cuerpo de la petición.
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

// Parsea las cookies de las peticiones.
server.use(cookieParser());

// Logger para ver las solicitudes en la consola.
server.use(morgan('dev'));

// Configurando headers para CORS. Esencial si tienes frontend y backend separados.
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Usando las rutas.
server.use('/', routes);

// Middleware de manejo de errores. Si algo falla en las rutas, terminarás aquí.
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

// Middleware para manejar rutas no encontradas.
server.use((req, res, next) => {
    res.status(404).send("Route not found");
});


module.exports = server;
