const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const { withHooks } = require('../common/hooks');

const tableName = process.env.tableName;

const handler = async () => {  
    const gamePlayers = await Dynamo.scan({
        tableName
    });

    return Responses._200(gamePlayers);
};

exports.handler = withHooks(handler);