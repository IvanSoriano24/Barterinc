// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importa el framework Express para crear el servidor
const express = require('express');

// Habilita CORS para permitir solicitudes desde otros dominios (por ejemplo, frontend)
const cors = require('cors');

// Importa las rutas definidas para los usuarios
const userRoutes = require('./routes/user.routes');

// Importa las rutas del módulo de cotizaciones (préstamos e inversiones)
const quoteRoutes = require('./routes/quote.routes');

// Si se desea activar el módulo de documentos, descomentar la siguiente línea
// const documentsRoutes = require('./routes/documents.routes');

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para permitir solicitudes desde otros orígenes (por ejemplo, desde el frontend web o móvil)
app.use(cors());

// Middleware para permitir recibir cuerpos de solicitudes en formato JSON
app.use(express.json());

// Rutas principales de la API

// Ruta base para las operaciones de usuario (registro, login, gestión)
app.use('/api/users', userRoutes);

// Ruta base para operaciones del cotizador
app.use('/api/quote', quoteRoutes);

// Ruta base para documentos (actualmente comentada, puede activarse si se necesita)
// app.use('/api/documents', documentsRoutes);

// Define el puerto en el que se levantará el servidor (puede estar en .env o por defecto 3000)
const PORT = process.env.PORT || 3000;

// Inicia el servidor y muestra un mensaje en consola al estar listo
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));