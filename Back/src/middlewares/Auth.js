const jwt = require('jsonwebtoken');

const validateToken = async ( req, res, next ) => {
    const Authorization = req.header("Authorization");
    if(!Authorization){
      return res.status(401).json({message: "Token no proporcionado"});
    }

   try {
     const token = Authorization.split("Bearer ")[1];
     const payload = jwt.verify(token, process.env.JWT_SECRET || "az_AZ");
 
     req.user = payload;
 
     next();
   } catch (error) {
        res.status(401).json({message: "Token inválido o expirado"});
   }
};

module.exports = { validateToken }