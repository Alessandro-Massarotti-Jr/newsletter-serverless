import { EmailTemplate } from "../../../../domain/entities/EmailTemplate";
import { IMailProvider } from "../IMailProvider";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export class SesMailProvider implements IMailProvider {
  async send(data: {
    template: EmailTemplate;
    emails: string[];
    variables: Record<string, string>;
  }): Promise<void> {
    const sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: data.emails,
      },
      Message: {
        Body: {
          Html: { Data: data.template.getTemplate(data.variables) },
        },
        Subject: { Data: data.template.getTitle() },
      },
      Source: process.env.MAIL_FROM,
    });
    await sesClient.send(command);
  }
}
