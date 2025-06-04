const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyAdmin } = require('../middlewares/auth.middleware');


// RUTAS PÚBLICAS (Clientes)

// Ruta para registrar un nuevo usuario (cliente, lender o investor)
router.post('/register', userController.registerUser);

// Ruta para iniciar sesión (genera token si el usuario está aprobado)
router.post('/login', userController.loginUser);

// Ruta para obtener el perfil del usuario autenticado
// Requiere un token válido en el encabezado
router.get('/profile', verifyToken, userController.getProfile);


// RUTAS ADMINISTRATIVAS (Requiere rol admin)

// Ruta para obtener todos los usuarios registrados
router.get('/', verifyAdmin, userController.getAllUsers);

// Ruta para obtener usuarios filtrados por estado (pending, active, rejected, etc.)
router.get('/status/:status', verifyAdmin, userController.getUsersByStatus);

// Ruta para obtener usuarios filtrados por rol (admin, lender, investor, etc.)
router.get('/by-role/:role', verifyAdmin, userController.getUsersByRole);

// Ruta para aprobar un usuario (cambia su estado a "active")
router.put('/:uid/approve', verifyAdmin, userController.approveUser);

// Ruta para rechazar un usuario (cambia su estado a "rejected")
router.put('/:uid/reject', verifyAdmin, userController.rejectUser);

// Ruta para suspender un usuario (cambia su estado a "suspended")
router.put('/:uid/suspend', verifyAdmin, userController.suspendUser);

// Ruta para eliminar un usuario (cambia su estado a "deleted" - eliminación lógica)
router.put('/:uid/delete', verifyAdmin, userController.deleteUser);


// Exporta las rutas para usarlas en la app principal
module.exports = router;
