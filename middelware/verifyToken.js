require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: "Aucun token fourni." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Échec de l'authentification du token." });
    }
    req.idUser = decoded.id;
    console.log('token ok')
    next();
  });
}

module.exports = verifyToken;