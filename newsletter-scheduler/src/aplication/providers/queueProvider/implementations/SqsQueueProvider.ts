import { IQueueProvider } from "../IQueueProvider";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export class SqsQueueProvider implements IQueueProvider {
  async sendMessage(data: { queue: string; body: Object }): Promise<void> {
    const sqsClient = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const command = new SendMessageCommand({
      QueueUrl: data.queue,
      MessageBody: JSON.stringify(data.body),
    });
    await sqsClient.send(command);
  }
}
