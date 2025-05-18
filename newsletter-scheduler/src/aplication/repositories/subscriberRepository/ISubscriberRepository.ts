import { Subscriber } from "../../../domain/entities/Subscriber";

export interface ISubscriberRepository {
  findWithLimit(data: {
    lastId?: string;
    limit: number;
  }): Promise<Subscriber[]>;
}
