// Importamos el módulo express y creamos una instancia del enrutador
const express = require('express');
const router = express.Router();

// Importamos el controlador que maneja la lógica del cotizador
const quoteController = require('../controllers/quote.controller');

// Importamos el middleware para verificar que el usuario esté autenticado
const { verifyToken } = require('../middlewares/auth.middleware');

// Ruta para calcular la inversión de un usuario tipo "investor"
// Esta ruta procesa los datos y devuelve el rendimiento esperado
router.post('/investor', quoteController.quoteInvestor);

// Ruta para calcular los pagos de un préstamo para un usuario tipo "lender"
// Esta ruta devuelve el total a pagar, intereses y pagos mensuales
router.post('/lender', quoteController.quoteLender);

// Exportamos el enrutador para usarlo en el archivo principal (index.js)
module.exports = router;