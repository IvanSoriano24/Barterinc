const admin = require('firebase-admin');
const path = require('path');

// Ruta absoluta a tu archivo de servicio
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: '<NOMBRE_BUCKET>.appspot.com', // reemplazar
});

const db = admin.firestore();

module.exports = { admin, db };
