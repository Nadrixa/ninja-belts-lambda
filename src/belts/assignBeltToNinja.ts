import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export async function handler (event: APIGatewayEvent): Promise<APIGatewayProxyResult> {

    return {
        statusCode: 404,
        body: 'Not implemented now'
    };
}