import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { dynamoDBNinjaBeltRepositoryWith } from "../../../src/belts/infraestructure/DynamoDBNinjaBeltRepository";

describe('DynamoDB adapter for NinjaBelts repository', () => {

    it('Should save ninja with belt in the table', async () => {

        const ninjaId = 'EXXXX';
        const belt = 'black';
        const dynamoDBConfig = {table: 'NinjaBelts', endpoint: 'http://localhost:8000', region: 'localhost'};
        const awsCredentials = {accessKeyId: 'DEFAULT', secretAccessKey: 'DEFAULT'};
        const documentClient = new DocumentClient({
            credentials: awsCredentials,
            endpoint: dynamoDBConfig.endpoint,
            region: dynamoDBConfig.region
        });
        const dynamoDBRepository = dynamoDBNinjaBeltRepositoryWith(dynamoDBConfig, awsCredentials);

        await dynamoDBRepository.save(ninjaId, belt);

        const { Item: ninjaWithBelt } = await documentClient.get({
            TableName: dynamoDBConfig.table,
            Key: {
                ninjaId
            },
            AttributesToGet: ['ninjaId', 'belt']
        }).promise();

        expect(ninjaWithBelt).toEqual({ninjaId, belt});
    });
});