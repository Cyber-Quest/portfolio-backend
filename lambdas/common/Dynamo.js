const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: "AKIAYT4ZWCNTEXSLEHMV",
    secretAccessKey: "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",
    "region": "sa-east-1"
}); 
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(TableName) {
        const params = {
            TableName
        }; 
        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID from ${TableName}`);
        }
        console.log(data);

        return data.Item;
    },

     async write(data, TableName) {
        if (!data.ID) {
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }

        return data;
    },

    update: async ({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) => {
        const params = {
            TableName: tableName,
            Key: { [primaryKey]: primaryKeyValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValues: {
                ':updateValue': updateValue,
            },
        };

        return documentClient.update(params).promise();
    },

    query: async ({ tableName }) => {
        const params = {
            TableName: tableName, 
        };

        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },

    scan: async ({ tableName, filterExpression, expressionAttributes }) => {
        let params;
        if(!filterExpression && !filterExpression){
            params = {
                TableName: tableName,
                FilterExpression: filterExpression,
                ExpressionAttributeValues: expressionAttributes,
            };
        }else{
            params = {
                TableName: tableName,
            }
        }      
        const res = await documentClient.scan(params).promise();
        return res.Items || [];
    },
};
module.exports = Dynamo;