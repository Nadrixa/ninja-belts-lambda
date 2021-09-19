import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

import { retrieveBeltPointsWith } from "./application/retrieveBeltPoints";
import { NotDefinedColorError } from "./domain/Colors";
import { buildConfigurationWith } from "./Configuration";
import { dynamoDBBeltPointsRepository } from "./infraestructure/DynamoDBBeltPointsRepository";

const configuration = buildConfigurationWith(process.env);
const dynamoDBRepository = dynamoDBBeltPointsRepository(configuration.dynamoDB, configuration.credentials);

const retrieveBeltPointsFor = retrieveBeltPointsWith(dynamoDBRepository);

export async function handler (event: APIGatewayEvent): Promise<APIGatewayProxyResult> {

    try {
        return {
            statusCode: 200,
            body: (await retrieveBeltPointsFor(event.pathParameters?.color ?? '')).toString()
        }
    } catch (error: any) {
        return {
            statusCode: isBadRequestThis(error) ? 400 : 500,
            body: error.message
        }
    }
}

function isBadRequestThis(error: Error): boolean {
    return (error instanceof NotDefinedColorError);
}