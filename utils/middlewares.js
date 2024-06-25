//Archivo que se encarga de checkear que las peticiones contengan el token de autorizacion

const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  
  if (!req.headers["authorization"]) {
    return res.status(401).json("Debes incluir la cabecera de autorización con el token");
  }
  const token = req.headers["authorization"]; 
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // Almacenamos el payload en el objeto de solicitud para su uso posterior en el controlador
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = { checkToken };
