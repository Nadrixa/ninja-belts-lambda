import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

import { inMemoryRetrievePointsOf } from "./infraestructure/InMemoryBeltPointsRetriever";

import { retrieveBeltPointsWith } from "./application/retrieveBeltPoints";
import { NotDefinedColorError } from "./domain/Belts";

const retrieveBeltPointsFor = retrieveBeltPointsWith(inMemoryRetrievePointsOf);

export async function handler (event: APIGatewayEvent): Promise<APIGatewayProxyResult> {

    try {
        return {
            statusCode: 200,
            body: retrieveBeltPointsFor(event.pathParameters?.color ?? '').toString()
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