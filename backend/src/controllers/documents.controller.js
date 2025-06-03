const { uploadFileToStorage, deleteFileFromStorage } = require('../services/storage.service');
const { db } = require('../firebase/firebase.config');

exports.uploadDocument = async (req, res) => {
    try {
        const { uid, type } = req.body;
        const file = req.file;

        if (!file || !uid || !type) return res.status(400).send('Datos incompletos');

        const fileUrl = await uploadFileToStorage(file, `documents/${uid}/${file.originalname}`);
        await db.collection('DOCUMENTS').add({ uid, type, url: fileUrl, timestamp: new Date() });

        res.status(200).json({ message: 'Documento subido', url: fileUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir documento');
    }
};

exports.getDocumentsByUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const snapshot = await db.collection('DOCUMENTS').where('uid', '==', uid).get();
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).send('Error al obtener documentos');
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const docRef = db.collection('DOCUMENTS').doc(id);
        const docSnap = await docRef.get();
        if (!docSnap.exists) return res.status(404).send('Documento no encontrado');

        const { url } = docSnap.data();
        await deleteFileFromStorage(url);
        await docRef.delete();

        res.status(200).send('Documento eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar documento');
    }
};