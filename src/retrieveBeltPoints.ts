import { APIGatewayEvent } from "aws-lambda";

export async function handler (event: APIGatewayEvent) {
    return `${event.pathParameters?.color} To be implemented`;
}