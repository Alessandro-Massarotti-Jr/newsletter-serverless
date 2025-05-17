import { EmailTemplate } from "../../../domain/entities/EmailTemplate";

export interface IEmailTemplateRepository {
  findByTemplateName(data: { name: string }): Promise<EmailTemplate>;
}
