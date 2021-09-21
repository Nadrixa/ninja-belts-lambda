import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { NinjaBeltsRepository } from "../domain/NinjaBeltsRepository";

type AwsCredentials = {
    accessKeyId: string,
    secretAccessKey: string
};

type DynamoDBConfiguration = {
    table: string,
    endpoint: string,
    region: string
};

export function dynamoDBNinjaBeltRepositoryWith({ endpoint, table, region}: DynamoDBConfiguration, credentials: AwsCredentials): NinjaBeltsRepository {

    const dynamoDBClient = new DocumentClient({
        endpoint,
        credentials,
        region,
    });

    return {
        async save(ninjaId, belt) {

            await dynamoDBClient.put({
                TableName: table,
                Item: {
                    ninjaId,
                    belt
                }
            }).promise();
        }
    }
}