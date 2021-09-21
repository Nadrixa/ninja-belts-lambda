export function buildConfigurationWith(env: {[key: string]: any}) {

    return {
        dynamoDB: {
            endpoint: env.DYNAMO_DB_ENDPOINT ?? 'http://localhost:8000',
            region: env.AWS_REGION ?? 'localhost'
        },
        sns: {
            endpoint: env.SNS_ENDPOINT ?? 'http://localhost:4002',
            region: env.AWS_REGION ?? 'localhost',
            snsTopicArn: env.SNS_TOPIC_ARN ?? 'arn:aws:sns:us-east-1:123456789012:test-topic'
        },
        credentials: {
            accessKeyId: env.ACCESSS_KEY ?? 'DEFAULT_KEY',
            secretAccessKey: env.SECRET_KEY ?? 'DEFAULT_SECRET_KEY'
        },
        beltPointsTable: env.BELT_POINTS_TABLE ?? 'BeltPoints',
        ninjaBeltsTable: env.NINJA_BELTS_TABLE ?? 'NinjaBelts'
    };
}