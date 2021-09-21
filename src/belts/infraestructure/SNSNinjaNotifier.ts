import { SNS } from "aws-sdk";

import { NinjaNotifier } from "../domain/NinjaNotifier";

type AwsCredentials = {
    accessKeyId: string,
    secretAccessKey: string
};

type SNSConfiguration = {
    endpoint: string,
    region: string,
    snsTopicArn: string
};

export function SNSNinjaNotifierWith({ endpoint, region, snsTopicArn }: SNSConfiguration, credentials: AwsCredentials): NinjaNotifier {
    const snsCli = new SNS({
        endpoint,
        region,
        credentials
    });

    return {
        async notifyToAll(ninjaId, belt) {
            await snsCli.publish({
                TopicArn: snsTopicArn,
                Message: `${ninjaId} has reached ${belt} belt!`
            }).promise();
        }
    }
}