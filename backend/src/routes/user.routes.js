const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyAdmin } = require('../middlewares/auth.middleware');


// Rutas Cliente
// Registrar usuario cliente
router.post('/register', userController.registerUser);

// Iniciar sesión
router.post('/login', userController.loginUser);

// Obtener perfil usuario
router.get('/profile', verifyToken, userController.getProfile);

// Aprobar Usuario
//router.put('/approve/:uid', verifyToken, userController.approveUser);


// Rutas ADMIN
// Obtener todos los usuarios
router.get('/', verifyAdmin, userController.getAllUsers);

// Obtener usuarios por status
router.get('/status/:status', verifyAdmin, userController.getUsersByStatus);

// Obtener usuarios por rol
router.get('/by-role/:role', verifyAdmin, userController.getUsersByRole);

// Aprobar usuario
router.put('/:uid/approve', verifyAdmin, userController.approveUser);

// Rechazar usuario
router.put('/:uid/reject', verifyAdmin, userController.rejectUser);

// Suspender usuario
router.put('/:uid/suspend', verifyAdmin, userController.suspendUser);

// Eliminar usuario
router.put('/:uid/delete', verifyAdmin, userController.deleteUser);

module.exports = router;