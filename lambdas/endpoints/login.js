const Responses = require('../common/API_Responses');
const jwt = require('jsonwebtoken'); 

const messageSecretJWT = process.env.messageSecretJWT;

const handler = async event => {  
    const control = JSON.parse(event.body); 

    if(control.user === 'wesley9983' && control.password === '123'){
      const id = 1; 
      const token = jwt.sign({ id }, messageSecretJWT, {
        expiresIn: 100  
      });
      return Responses._200({ auth: true, token: token});
    }
    
    return Responses._400({user: control.password, auth: false}); 
};

exports.handler = handler;