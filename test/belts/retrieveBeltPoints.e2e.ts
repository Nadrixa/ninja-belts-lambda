import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import axios from 'axios';

import beltPoints from '../../serverless/beltPoints.json';

import { localAPIGateway } from './support/retrieveLocalAPI';

describe('Retrieve belt points', () => {

    const apiGatewayEndpoint = localAPIGateway();

    it('Should return 400 when no color is not defined', async () => {

        // Setup
        expect.assertions(2);

        // Given
        const notDefinedColor = 'someColor';

        try {
            // When
            await axios.get(`${apiGatewayEndpoint}/belts/${notDefinedColor}/points`);
        } catch (error: any) {
            // Then
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe(`Color ${notDefinedColor} is not defined`);
        }
    });

    it('Should return 200 and points to get yellow belt', async () => {

        // Setup
        const dynamoDBConfig = {table: 'BeltPoints', endpoint: 'http://localhost:4566', region: 'us-east-1'};
        const awsCredentials = {accessKeyId: 'DEFAULT', secretAccessKey: 'DEFAULT'};
        const documentClient = new DocumentClient({
            credentials: awsCredentials,
            endpoint: dynamoDBConfig.endpoint,
            region: dynamoDBConfig.region
        });
        await Promise.all(beltPoints.map(({color, points}) => documentClient.put({TableName: dynamoDBConfig.table, Item: {color, points}}).promise()));
        

        // Given
        const beltColor = 'yellow';

        // When
        const { data: points, status } = (await axios.get(`${apiGatewayEndpoint}/belts/${beltColor}/points`));

        // Then
        expect(status).toBe(200);
        expect(points).toBe(100);

        // Cleanup
        await Promise.all(beltPoints.map(({color}) => documentClient.delete({TableName: dynamoDBConfig.table, Key: {color}}).promise()));
    });

});