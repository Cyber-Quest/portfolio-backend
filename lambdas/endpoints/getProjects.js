const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const { withHooks } = require('../common/hooks');
const { verifyJWT } = require("../common/JWT");

const tableName = process.env.tableName;

const handler = async event => {  
    const { auth, message } = verifyJWT(event.headers); 
    if(auth === false)
        return Responses._500({message: message});

    const gamePlayers = await Dynamo.scan({
        tableName
    });

    return Responses._200(gamePlayers);
};

exports.handler = withHooks(handler);