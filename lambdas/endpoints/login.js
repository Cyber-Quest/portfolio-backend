const Responses = require('../common/API_Responses'); 
const { createJWT } = require("../common/JWT");

const handler = async event => {  
    const control = JSON.parse(event.body); 

    if(control.user === 'wesley9983' && control.password === '123'){
      const id = 1; 
      const token = createJWT(id);
      return Responses._200({ auth: true, token: token});
    }
    
    return Responses._400({message:"usuário não existe!", auth: false}); 
};

exports.handler = handler;