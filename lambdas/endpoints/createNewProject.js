const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const { hooksWithValidation } = require('../common/hooks');
const yup = require('yup'); 
const { verifyJWT } = require("../common/JWT");

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({
    name: yup.string().required(),
    link: yup.string().required(),
    title: yup.string().required(),
    subtitle: yup.string().required(),
    date: yup.date().default(function () {
        return new Date();
    })
});

const pathSchema = yup.object().shape({
    ID: yup.string().required(),
});

const handler = async event => {
    const { auth, message } = verifyJWT(event.headers); 
    if(auth === false)
        return Responses._500({message: message});

    let ID = event.pathParameters.ID;
    const project = event.body;
    project.ID = ID;

    const newProject = await Dynamo.write(project, tableName);

    if (!newProject) {
        return Responses._400({ message: 'Failed to write project by ID' });
    }

    return Responses._200({ newProject });
};

exports.handler = hooksWithValidation({ bodySchema, pathSchema })(handler);