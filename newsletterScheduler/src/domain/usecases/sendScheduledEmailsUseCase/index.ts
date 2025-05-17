import { SqsQueueProvider } from "../../../aplication/providers/queueProvider/implementations/SqsQueueProvider";
import { MongoScheduleEmailRepository } from "../../../aplication/repositories/scheduledEmailRepository/implementations/MongoScheduleEmailRepository";
import { MongoSubscriberRepository } from "../../../aplication/repositories/subscriberRepository/implementations/MongoSubscriberRepository";
import { SendScheduledEmailsUseCase } from "./SendScheduledEmailsUseCase";

const scheduledEmailsRepository = new MongoScheduleEmailRepository(
  process.env.MONGO_DB_SCHEDULED_EMAILS_DATABASE!,
  process.env.MONGO_DB_SCHEDULED_EMAILS_COLLECTION!
);

const subscriberRepository = new MongoSubscriberRepository(
  process.env.MONGO_DB_SUBSCRIBERS_DATABASE!,
  process.env.MONGO_DB_SUBSCRIBERS_COLLECTION!
);

const queueProvider = new SqsQueueProvider();

const sendScheduledEmailsUseCase = new SendScheduledEmailsUseCase(
  scheduledEmailsRepository,
  subscriberRepository,
  queueProvider
);

export { sendScheduledEmailsUseCase };
