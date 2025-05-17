import mongoose, { Model } from "mongoose";
import { MongoDbBase } from "../../../../database/config/MongoDb";
import { IScheduledEmailRepository } from "../IScheduledEmailRepository";
import { ScheduledEmail } from "../../../../domain/entities/ScheduledEmail";
import { ScheduledEmailsSchema } from "../../../../database/schemas/ScheduledEmailsSchema";

export class MongoScheduleEmailRepository
  extends MongoDbBase
  implements IScheduledEmailRepository
{
  private ScheduledEmailModel: Model<any> = mongoose.model(
    this.collection,
    ScheduledEmailsSchema
  );

  async findAllUnsented(): Promise<ScheduledEmail[]> {
    const documents = await this.ScheduledEmailModel.find({
      sent: false,
      scheduleDate: { $gt: new Date().getTime() },
    }).lean<
      {
        _id: string;
        template: string;
        variables: Record<string, string>;
        sent: boolean;
        scheduleDate: number;
      }[]
    >();

    return documents.map(
      (document) =>
        new ScheduledEmail({
          id: document._id,
          template: document.template,
          variables: document.variables,
          sent: document.sent,
          scheduleDate: document.scheduleDate,
        })
    );
  }
  async updateToSent(data: { id: string }): Promise<void> {
    await this.ScheduledEmailModel.findOneAndUpdate(
      { id: data.id },
      { $set: { sent: true } }
    );
  }
}
