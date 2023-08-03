const jwt = require('jsonwebtoken');

module.exports.verifyToken = function (req, res, next) {
  try {
    const bearerHeader = req.headers['authorization'] ?? req.headers['Authorization'];
    const { id } = req.body ?? {};
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      const decode = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
      if (id && id !== decode.id) {
        throw new Error('Invalid token');
      }
      req.user = decode;
      return next();
    }
    throw new Error('Token is not supplied');
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};