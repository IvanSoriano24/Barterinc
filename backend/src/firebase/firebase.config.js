// Importa el SDK de administración de Firebase para usar Firestore, Auth y Storage
const admin = require('firebase-admin');

// Importa el módulo 'path' de Node.js para manejar rutas de archivos
//const path = require('path');

// Carga el archivo de credenciales desde una ruta definida en la variable de entorno
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

/**
 * Inicializa la app de Firebase Admin
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

    //Aun en desarrollo
    // Reemplazar '<NOMBRE_BUCKET>' con el ID del bucket de Firebase Storage
    storageBucket: '<NOMBRE_BUCKET>.appspot.com',
});

// Obtiene una instancia de Firestore (base de datos NoSQL de Firebase)
const db = admin.firestore();

// Exporta tanto la instancia completa de admin como la de Firestore
module.exports = { admin, db };
