import { ScheduledEmail } from "../../../domain/entities/ScheduledEmail";

export interface IScheduledEmailRepository {
  findAllUnsented(): Promise<ScheduledEmail[]>;
  updateToSent(data: { id: string }): Promise<void>;
}
