import mongoose, { Model } from "mongoose";
import { MongoDbBase } from "../../../../database/config/MongoDb";
import { SubscriberSchema } from "../../../../database/schemas/SubscriberSchema";
import { ISubscriberRepository } from "../ISubscriberRepository";

export class MongoSubscriberRepository
  extends MongoDbBase
  implements ISubscriberRepository
{
  private subscribersModel: Model<any> = mongoose.model(
    this.collection,
    SubscriberSchema
  );

  async create(data: { email: string }): Promise<void> {
    await this.subscribersModel.findOneAndUpdate(
      data,
      { $set: data },
      {
        new: true,
        upsert: true,
      }
    );
  }
}
