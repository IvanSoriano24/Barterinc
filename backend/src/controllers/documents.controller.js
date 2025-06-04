// Importa las funciones de carga y eliminación del servicio de almacenamiento
const { uploadFileToStorage, deleteFileFromStorage } = require('../services/storage.service');
// Importa la instancia de la base de datos de Firebase
const { db } = require('../firebase/firebase.config');

/**
 * Subir un documento al storage de Firebase y registrar su metadata en Firestore
 */
exports.uploadDocument = async (req, res) => {
    try {
        // Extrae uid del usuario y tipo de documento desde el cuerpo del request
        const { uid, type } = req.body;
        const file = req.file; // Archivo adjunto enviado desde el cliente (por ejemplo, un contrato PDF)

        // Validación de datos obligatorios
        if (!file || !uid || !type) return res.status(400).send('Datos incompletos');

        // Sube el archivo a Firebase Storage y obtiene la URL pública
        const fileUrl = await uploadFileToStorage(file, `documents/${uid}/${file.originalname}`);

        // Registra el documento en Firestore con referencia al archivo subido
        await db.collection('DOCUMENTS').add({
            uid,         // Identificador del usuario
            type,        // Tipo del documento (por ejemplo: contrato, INE, etc.)
            url: fileUrl, // URL de acceso al archivo
            timestamp: new Date() // Fecha de carga
        });

        // Devuelve respuesta con éxito y URL
        res.status(200).json({ message: 'Documento subido', url: fileUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir documento');
    }
};

/**
 * Obtener todos los documentos asociados a un usuario específico
 */
exports.getDocumentsByUser = async (req, res) => {
    try {
        const { uid } = req.params;

        // Consulta a Firestore para obtener todos los documentos cuyo campo uid coincida
        const snapshot = await db.collection('DOCUMENTS').where('uid', '==', uid).get();

        // Mapea los documentos encontrados con su ID y datos
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(docs);
    } catch (error) {
        res.status(500).send('Error al obtener documentos');
    }
};

/**
 * Eliminar un documento tanto del Storage como del Firestore
 */
exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        // Obtiene la referencia del documento en Firestore
        const docRef = db.collection('DOCUMENTS').doc(id);
        const docSnap = await docRef.get();

        // Si el documento no existe, responde con 404
        if (!docSnap.exists) return res.status(404).send('Documento no encontrado');

        // Obtiene la URL del archivo para eliminarlo del storage
        const { url } = docSnap.data();

        // Elimina el archivo del storage y el registro en Firestore
        await deleteFileFromStorage(url);
        await docRef.delete();

        res.status(200).send('Documento eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar documento');
    }
};
