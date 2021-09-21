import { SNS } from "aws-sdk";
import axios from "axios";

import { closeSubscriber, initSubscriberIn } from '../support/httpSubscriber';

import { SNSNinjaNotifierWith } from "../../../src/belts/infraestructure/SNSNinjaNotifier";


describe('SNS adapter for ninja notifier', () => {

    it('Should notify to other ninjas endpoint with ninjaId and belt', async () => {

        // Given + setup
        const ninjaId = 'EXXXX';
        const belt = 'black';
        const snsConfig = {
            endpoint: 'http://localhost:4002',
            region: 'localhost',
            snsTopicArn: 'arn:aws:sns:us-east-1:123456789012:test-topic'
        };
        const credentials = {
            accessKeyId: 'DEFAULT',
            secretAccessKey: 'DEFAULT'
        };

        const SNSNotifier = SNSNinjaNotifierWith(snsConfig, credentials);
        await initSNSAndSubscriberWith(snsConfig, credentials, 5000);

        // When
        await SNSNotifier.notifyToAll(ninjaId, belt);

        // Then
        const message = await axios.get('http://localhost:5000/receivedMessage');
        expect(message.data).toEqual(`${ninjaId} has reached ${belt} belt!`);

        // Cleanup
        await closeSubscriber();
    });
});

async function initSNSAndSubscriberWith({endpoint, region, snsTopicArn}: {endpoint: string, region: string, snsTopicArn: string}, credentials: {accessKeyId: string, secretAccessKey: string}, subscriberPort: number) {

    await initSubscriberIn(subscriberPort);
        
    const snsCli = new SNS({
        endpoint,
        region,
        credentials
    });

    await snsCli.subscribe({
        Protocol: 'http',
        TopicArn: snsTopicArn,
        Endpoint: `http://localhost:${subscriberPort}/ninjas`
    }).promise();
}