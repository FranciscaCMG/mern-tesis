const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    // Verificar que el encabezado Authorization exista
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extraer el token del encabezado
    const token = authorization.split(' ')[1];

    // Verificar que el token exista
    if (!token) {
        return res.status(401).json({ message: 'Token missing in Authorization header' });
    }

    try {
        // Verificar el token
        const userInfo = await jwt.verify(token, process.env.JWT_SECRET || 'farid');
        req.userInfo = userInfo; // Adjuntar información del usuario al objeto `req`
        next(); // Continuar al siguiente middleware/controlador
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'unauthorized' });
    }
};

module.exports = auth;
