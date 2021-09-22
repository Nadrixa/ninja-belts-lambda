import { DocumentClient } from "aws-sdk/clients/dynamodb";

import beltPoints from '../../../serverless/beltPoints.json';

import { dynamoDBBeltPointsRepository } from "../../../src/belts/infraestructure/DynamoDBBeltPointsRepository";

describe('DynamoDBBeltPointsRepository', () => {

    it('Should retrieve points of defined given color', async () => {

        // Setup
        const dynamoDBConfig = {table: 'BeltPoints', endpoint: 'http://localhost:4566', region: 'us-east-1'};
        const awsCredentials = {accessKeyId: 'DEFAULT', secretAccessKey: 'DEFAULT'};
        const documentClient = new DocumentClient({
            credentials: awsCredentials,
            endpoint: dynamoDBConfig.endpoint,
            region: dynamoDBConfig.region
        });
        await Promise.all(beltPoints.map(({color, points}) => documentClient.put({TableName: dynamoDBConfig.table, Item: {color, points}}).promise()));

        const color = 'yellow';
        const expectedPoints = 100;
        const dynamoDBRepository = dynamoDBBeltPointsRepository(dynamoDBConfig, awsCredentials);

        const points = await dynamoDBRepository.retrievePointsOf(color);

        expect(points).toBe(expectedPoints);

        // Cleanup
        await Promise.all(beltPoints.map(({color}) => documentClient.delete({TableName: dynamoDBConfig.table, Key: {color}}).promise()));
    });

    it('Should retrieve NaN when given color is not in the table', async () => {
        const color = 'someColor';
        const expectedPoints = NaN;
        const dynamoDBRepository = dynamoDBBeltPointsRepository({table: 'BeltPoints', endpoint: 'http://localhost:4566', region: 'us-east-1'}, {accessKeyId: 'DEFAULT', secretAccessKey: 'DEFAULT'});

        const points = await dynamoDBRepository.retrievePointsOf(color);

        expect(points).toBe(expectedPoints);
    });
});