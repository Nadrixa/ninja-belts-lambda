export function buildConfigurationWith(env: {[key: string]: any}) {

    return {
        dynamoDB: {
            endpoint: env.DYNAMO_DB_ENDPOINT ?? 'http://localhost:8000',
            table: env.BELT_POINTS_TABLE ?? 'BeltPoints',
            region: env.AWS_REGION ?? 'localhost'
        },
        credentials: {
            accessKeyId: env.ACCESSS_KEY ?? 'DEFAULT_KEY',
            secretAccessKey: env.SECRET_KEY ?? 'DEFAULT_SECRET_KEY'
        }
    };
}