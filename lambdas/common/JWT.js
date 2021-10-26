const jwt = require('jsonwebtoken'); 

const messageSecretJWT = process.env.messageSecretJWT;

const createJWT = (id) =>{
  return jwt.sign({ id }, messageSecretJWT, {
        expiresIn: "15m"  
  });
}

const verifyJWT = (req) =>{
    let token = req['Authorization'];
    if (!token)  return {auth: false, message: "No token provided."};
    
    return {
     auth: jwt.verify(token, messageSecretJWT, (err) => {
            if (err) return false; 
            return true;
          }),
     message: "Failed to authenticate token."};   
}

module.exports = { verifyJWT, createJWT };