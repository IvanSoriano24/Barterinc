// Importamos el módulo de administración de Firebase
const admin = require('firebase-admin');

// Importamos el archivo de clave privada del servicio para autenticar Firebase Admin SDK
const serviceAccount = require('../firebase-service-account.json');

// Inicializamos la app de Firebase con las credenciales del servicio
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Obtenemos una instancia de Firestore (base de datos)
const db = admin.firestore();

// Obtenemos una instancia del servicio de autenticación de Firebase
const auth = admin.auth();

// Exportamos las instancias para usarlas en otros archivos
module.exports = { db, auth };
