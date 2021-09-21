import { DynamoDB } from 'aws-sdk';
import { BeltPointsRepository } from '../domain/BeltPointsRepository';

type AwsCredentials = {
    accessKeyId: string,
    secretAccessKey: string
};

type DynamoDBConfiguration = {
    table: string,
    endpoint: string,
    region: string
};

export function dynamoDBBeltPointsRepository({table, endpoint, region}: DynamoDBConfiguration, credentials: AwsCredentials): BeltPointsRepository {

    const dynamoDBClient = new DynamoDB.DocumentClient({
        endpoint,
        credentials,
        region,
    });

    return {
        async retrievePointsOf(color) {
                const pointsItem = await dynamoDBClient.get({
                    TableName: table,
                    Key: {
                        color
                    },
                    AttributesToGet: ['points']
                }).promise();

                return Number(pointsItem.Item?.points);
        }
    };
}
