const firebase = require('../services/firebase.service');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const userRecord = await firebase.auth.createUser({ email, password });
        await firebase.db.collection('users').doc(userRecord.uid).set({
            email,
            role,
            status: 'pending'
        });
        res.status(201).send('User registered and pending approval');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.loginUser = async (req, res) => {
    const { email } = req.body;
    try {
        const snapshot = await firebase.db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) return res.status(404).send('User not found');

        const userDoc = snapshot.docs[0];
        const data = userDoc.data();
        if (data.status !== 'active') return res.status(403).send('User not approved yet');

        const token = jwt.sign({ uid: userDoc.id, role: data.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getProfile = async (req, res) => {
    try {
        const doc = await firebase.db.collection('users').doc(req.user.uid).get();
        res.json(doc.data());
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.approveUser = async (req, res) => {
    const { uid } = req.params;
    try {
        await firebase.db.collection('users').doc(uid).update({ status: 'active' });
        res.send('User approved successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

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

exports.getAllUsers = async (req, res) => {
    try {
        const snapshot = await firebase.db.collection('users').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

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

exports.rejectUser = async (req, res) => {
    const { uid } = req.params;
    try {
        await firebase.db.collection('users').doc(uid).update({ status: 'rejected' });
        res.send('User rejected');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.suspendUser = async (req, res) => {
    const { uid } = req.params;
    try {
        await firebase.db.collection('users').doc(uid).update({ status: 'suspended' });
        res.send('User suspended');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        await firebase.db.collection('users').doc(uid).update({ status: 'deleted' });
        res.send('User deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
};




