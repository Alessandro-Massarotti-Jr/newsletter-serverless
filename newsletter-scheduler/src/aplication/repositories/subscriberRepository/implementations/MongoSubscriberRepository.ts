import mongoose, { Model, Types } from "mongoose";
import { MongoDbBase } from "../../../../database/config/MongoDb";
import { SubscriberSchema } from "../../../../database/schemas/SubscriberSchema";
import { ISubscriberRepository } from "../ISubscriberRepository";
import { Subscriber } from "../../../../domain/entities/Subscriber";

export class MongoSubscriberRepository
  extends MongoDbBase
  implements ISubscriberRepository
{
  private subscribersModel: Model<any> = mongoose.model(
    this.collection,
    SubscriberSchema
  );

  async findWithLimit(data: {
    lastId: string;
    limit: number;
  }): Promise<Subscriber[]> {
    const query: any = {};
    if (data.lastId) {
      query._id = { $gt: new Types.ObjectId(data.lastId) };
    }
    const subscribers = await this.subscribersModel
      .find(query)
      .sort({ _id: 1 })
      .limit(data.limit)
      .lean<{ email: string; _id: string }[]>();

    return subscribers.map(
      (subscriber) =>
        new Subscriber({
          email: subscriber.email,
          id: subscriber._id,
        })
    );
  }
}
