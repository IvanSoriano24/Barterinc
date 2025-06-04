// Importa los servicios de Firebase y JWT
const firebase = require('../services/firebase.service');
const jwt = require('jsonwebtoken');

/**
 * Registra un nuevo usuario en Firebase Auth y Firestore
 */
exports.registerUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Crea el usuario en Firebase Authentication
        const userRecord = await firebase.auth.createUser({ email, password });

        // Guarda los datos adicionales del usuario en Firestore
        await firebase.db.collection('users').doc(userRecord.uid).set({
            email,
            role,
            status: 'pending' // El usuario se crea como "pendiente"
        });

        res.status(201).send('Usuario registrado y pendiente de aprobación');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Inicia sesión validando el correo electrónico y estado del usuario
 * No valida contraseña directamente porque se asume login externo o token externo
 */
exports.loginUser = async (req, res) => {
    const { email } = req.body;

    try {
        // Busca el usuario por correo electrónico en Firestore
        const snapshot = await firebase.db.collection('users').where('email', '==', email).get();

        if (snapshot.empty) return res.status(404).send('Usuario no encontrado');

        const userDoc = snapshot.docs[0];
        const data = userDoc.data();

        // Verifica si el usuario está aprobado
        if (data.status !== 'active') return res.status(403).send('Usuario no aprobado');

        // Genera un token JWT con el UID y rol del usuario
        const token = jwt.sign(
            { uid: userDoc.id, role: data.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Obtiene el perfil del usuario autenticado
 */
exports.getProfile = async (req, res) => {
    try {
        const doc = await firebase.db.collection('users').doc(req.user.uid).get();
        res.json(doc.data());
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Aprueba a un usuario cambiando su estado a 'active'
 */
exports.approveUser = async (req, res) => {
    const { uid } = req.params;

    try {
        await firebase.db.collection('users').doc(uid).update({ status: 'active' });
        res.send('Usuario aprobado');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Obtiene usuarios por su rol (lender, investor, admin, etc.)
 */
exports.getUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const snapshot = await firebase.db.collection('users').where('role', '==', role).get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Obtiene todos los usuarios del sistema
 */
exports.getAllUsers = async (req, res) => {
    try {
        const snapshot = await firebase.db.collection('users').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

/**
 * Obtiene usuarios filtrados por su estado (pending, active, suspended, etc.)
 */
exports.getUsersByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const snapshot = await firebase.db.collection('users').where('status', '==', status).get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

/**
 * Rechaza a un usuario cambiando su estado a 'rejected'
 */
exports.rejectUser = async (req, res) => {
    const { uid } = req.params;

    try {
        await firebase.db.collection('users').doc(uid).update({ status: 'rejected' });
        res.send('Usuario rechazado');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

/**
 * Suspende a un usuario cambiando su estado a 'suspended'
 */
exports.suspendUser = async (req, res) => {
    const { uid } = req.params;

    try {
        await firebase.db.collection('users').doc(uid).update({ status: 'suspended' });
        res.send('Usuario suspendido');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

/**
 * Elimina lógicamente a un usuario cambiando su estado a 'deleted'
 */
exports.deleteUser = async (req, res) => {
    const { uid } = req.params;

    try {
        await firebase.db.collection('users').doc(uid).update({ status: 'deleted' });
        res.send('Usuario eliminado');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
