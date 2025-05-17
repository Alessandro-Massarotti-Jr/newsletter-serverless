import mongoose, { Model } from "mongoose";
import { MongoDbBase } from "../../../../database/config/MongoDb";
import { EmailTemplatesSchema } from "../../../../database/schemas/EmailTemplatesSchema";
import { IEmailTemplateRepository } from "../IEmailTemplateRepository";
import { EmailTemplate } from "../../../../domain/entities/EmailTemplate";

export class MongoEmailTemplateRepository
  extends MongoDbBase
  implements IEmailTemplateRepository
{
  private emailTemplateModel: Model<any> = mongoose.model(
    this.collection,
    EmailTemplatesSchema
  );

  async findByTemplateName(data: { name: string }): Promise<EmailTemplate> {
    const template = await this.emailTemplateModel
      .findOne(data)
      .lean<{ name: string; template: string; title: string }>();

    if (!template) {
      throw new Error("Email template not found");
    }

    return new EmailTemplate(template);
  }
}
