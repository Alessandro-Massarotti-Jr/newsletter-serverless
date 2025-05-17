import { EmailTemplate } from "../../../domain/entities/EmailTemplate";

export interface IMailProvider {
  send(data: {
    template: EmailTemplate;
    emails: string[];
    variables: Record<string, string>;
  }): Promise<void>;
}
