import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

import { buildConfigurationWith } from "./Configuration";
import { dynamoDBNinjaBeltRepositoryWith } from "./infraestructure/DynamoDBNinjaBeltRepository";
import { SNSNinjaNotifierWith } from "./infraestructure/SNSNinjaNotifier";

import { assignBeltToNinjaWith } from "./application/assignBeltToNinja";
import { NotDefinedColorError } from "./domain/Colors";
import { NotValidNinjaIdError } from "./domain/Ninja";

const configuration = buildConfigurationWith(process.env);
const ninjaBeltsRepository = dynamoDBNinjaBeltRepositoryWith({...configuration.dynamoDB, table: configuration.ninjaBeltsTable}, configuration.credentials);
const ninjaNotifier = SNSNinjaNotifierWith(configuration.sns, configuration.credentials);
const assignBeltToNinjaUseCase = assignBeltToNinjaWith(ninjaBeltsRepository, ninjaNotifier);

export async function handler (event: APIGatewayEvent): Promise<APIGatewayProxyResult> {

    const body = JSON.parse(event.body ?? '{}');

    try {
        await assignBeltToNinjaUseCase(body.ninjaId, body.belt);
        return {
            statusCode: 204,
            body: ''
        };
    } catch (error: any) {
        return {
            statusCode: isBadRequestThis(error) ? 400 : 500,
            body: error.message
        };
    }
}

function isBadRequestThis (error: Error): boolean {
    return (error instanceof NotDefinedColorError || error instanceof NotValidNinjaIdError);
}