import { SNS } from "aws-sdk";
import axios from "axios";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { closeSubscriber, initSubscriberIn } from "./support/httpSubscriber";
import { localAPIGateway } from "./support/retrieveLocalAPI";

import { buildConfigurationWith } from '../../src/belts/Configuration';

describe('Asssign belt to ninja', () => {

    const apiGatewayEndpoint = localAPIGateway();

    it('Should return 204, save in dynamoDB and notify other ninjas when ninja and belt passed are right', async () => {
    
        try {
            // Setup
            process.env.DYNAMO_DB_ENDPOINT = 'http://localhost:4566';
            process.env.AWS_REGION = 'us-east-1';
            process.env.SNS_ENDPOINT = 'http://localhost:4566';
            process.env.SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:000000000000:NinjasTopic';
            const configuration = buildConfigurationWith(process.env);
            await initDependenciesUsing(configuration);
            
            // Given
            const belt = 'black';
            const ninjaId = 'EXXXX';


            // When
            const response = await axios.post(`${apiGatewayEndpoint}/ninja/belt`, {
                belt,
                ninjaId
            });

            // Then
            expect(response.status).toBe(204);

            const documentClient = new DocumentClient({
                credentials: configuration.credentials,
                endpoint: configuration.dynamoDB.endpoint,
                region: configuration.dynamoDB.region
            });
            const {Item: savedNinja} = await documentClient.get({TableName: configuration.ninjaBeltsTable, Key: {ninjaId}}).promise();
            expect(savedNinja).toEqual({ninjaId, belt});

            const message = await axios.get('http://localhost:5000/receivedMessage');
            expect(message.data).toEqual(`${ninjaId} has reached ${belt} belt!`);
        } finally {
            // Cleanup
            await closeSubscriber();
        }

    });

    it.each([
        ['ninjaId is not defined', undefined, 'black', 'Ninja id should be defined!'],
        ['belt is not a defined color', 'EXXXX', 'someColor', 'Color someColor is not defined'],
        ['belt is not defined', 'EXXXX', undefined, 'Color  is not defined']
    ])('Should return 400 when %s', async (_caseDescription, ninjaId, belt, expectedErrorMsg) => {

        // Setup
        expect.assertions(2);

        try {
            // When
            await axios.post(`${apiGatewayEndpoint}/ninja/belt`, {
                belt,
                ninjaId
            });
        } catch (error: any) {
            // Then
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe(expectedErrorMsg);
        }
    });

});

async function initDependenciesUsing(configuration: any) {

    const subscriberPort = 5000;

    await initSubscriberIn(subscriberPort);
        
    const snsCli = new SNS({
        endpoint: configuration.sns.endpoint,
        region: configuration.sns.region,
        credentials: configuration.credentials
    });

    await snsCli.subscribe({
        Protocol: 'http',
        TopicArn: configuration.sns.snsTopicArn,
        Endpoint: `http://host.docker.internal:${subscriberPort}/ninjas`
    }).promise();
}