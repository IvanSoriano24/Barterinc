// Importa el módulo de almacenamiento de Firebase Admin
const { getStorage } = require('firebase-admin/storage');

// Importa path para manipular rutas y uuid para generar identificadores únicos
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Función para subir un archivo a Firebase Storage
exports.uploadFileToStorage = async (file, destinationPath) => {
    // Obtiene el bucket por defecto configurado en Firebase
    const bucket = getStorage().bucket();

    // Define la ubicación del archivo dentro del bucket
    const blob = bucket.file(destinationPath);

    // Genera un token único para permitir el acceso al archivo subido
    const uuid = uuidv4();

    // Guarda el archivo en el bucket con metadatos
    await blob.save(file.buffer, {
        metadata: {
            contentType: file.mimetype, // Tipo MIME del archivo (ej: image/png, application/pdf)
            metadata: { firebaseStorageDownloadTokens: uuid }, // Token necesario para acceder al archivo por URL
        },
    });

    // Devuelve la URL pública para acceder al archivo subido
    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destinationPath)}?alt=media&token=${uuid}`;
};

// Función para eliminar un archivo del Firebase Storage a partir de su URL
exports.deleteFileFromStorage = async (fileUrl) => {
    const bucket = getStorage().bucket();

    // Extrae el path interno del archivo a partir de su URL
    const pathname = decodeURIComponent(new URL(fileUrl).pathname);
    const pathParts = pathname.split('/o/')[1].split('?')[0];

    // Elimina el archivo del bucket
    await bucket.file(pathParts).delete();
};
