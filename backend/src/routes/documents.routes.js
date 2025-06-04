const express = require('express');
const router = express.Router();

// Multer se utiliza para manejar archivos enviados desde el frontend
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Almacenamiento en memoria para subir a Firebase Storage

// Importamos las funciones del controlador de documentos
const { uploadDocument, getDocumentsByUser, deleteDocument } = require('../controllers/documents.controller');

// Middleware de autenticación para proteger las rutas
const { verifyToken } = require('../middlewares/auth.middleware');

// Ruta para subir un documento
// Requiere un archivo con nombre 'file' y un token válido
router.post('/upload', verifyToken, upload.single('file'), uploadDocument);

// Ruta para obtener todos los documentos de un usuario por su UID
router.get('/:uid', verifyToken, getDocumentsByUser);

// Ruta para eliminar un documento por su ID
router.delete('/:id', verifyToken, deleteDocument);


// Exporta las rutas para usarlas en la app principal
module.exports = router;
