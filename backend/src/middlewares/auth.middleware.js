// Importa la librería JSON Web Token para validar tokens
const jwt = require('jsonwebtoken');

/**
 * Middleware: Verifica que el token JWT esté presente y sea válido
 * - Si es válido, agrega el objeto `user` al request con el contenido del token
 * - Si no hay token o es inválido, devuelve error correspondiente
 */
exports.verifyToken = (req, res, next) => {
    // Extrae el token desde los headers (usualmente enviado en "Authorization")
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token requerido'); // Error si no hay token

    // Verifica el token usando la clave secreta almacenada en el .env
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Token invalido'); // Token inválido o expirado

        // Si el token es válido, se guarda el contenido decodificado en req.user
        req.user = decoded;
        next(); // Continúa al siguiente middleware o controlador
    })
};

/**
 * Middleware: Verifica que el usuario tenga el rol `admin`
 * - Requiere token válido
 * - Si no es admin, devuelve error 403
 */
exports.verifyAdmin = (req, res, next) => {
    // Extrae el token del header
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token requerido');

    // Verifica y decodifica el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Token invalido');

        // Verifica que el usuario tenga el rol `admin`
        if (decoded.role !== 'admin') return res.status(403).send('Requiere permisos de admin');

        req.user = decoded;
        next(); // Usuario autorizado, continúa con la petición
    });
};
