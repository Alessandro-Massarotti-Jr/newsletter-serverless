import { SQSEvent } from "aws-lambda";
import { MongoEmailTemplateRepository } from "./aplication/repositories/emailTemplateRepository/implementations/MongoEmailTemplateRepository";
import { SesMailProvider } from "./aplication/providers/mailProvider/implementations/SesMailProvider";

type sendEmailMessage = {
  tamplate: string;
  emails: string[];
  variables: Record<string, string>;
};

export async function handler(event: SQSEvent): Promise<void> {
  for (const record of event.Records) {
    const body: sendEmailMessage = JSON.parse(record.body);
    const repository = new MongoEmailTemplateRepository(
      process.env.MONGO_DB_DATABASE!,
      process.env.MONGO_DB_COLLECTION!
    );
    const provider = new SesMailProvider();
    const emailTemplate = await repository.findByTemplateName({
      name: body.tamplate,
    });
    await provider.send({
      emails: body.emails,
      template: emailTemplate,
      variables: body.variables,
    });
  }
  return;
}
