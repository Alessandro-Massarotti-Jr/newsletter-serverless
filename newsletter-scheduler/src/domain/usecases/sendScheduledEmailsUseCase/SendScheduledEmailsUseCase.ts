import { IQueueProvider } from "../../../aplication/providers/queueProvider/IQueueProvider";
import { IScheduledEmailRepository } from "../../../aplication/repositories/scheduledEmailRepository/IScheduledEmailRepository";
import { ISubscriberRepository } from "../../../aplication/repositories/subscriberRepository/ISubscriberRepository";

export class SendScheduledEmailsUseCase {
  constructor(
    private scheduledEmailsRepository: IScheduledEmailRepository,
    private subscriberRepository: ISubscriberRepository,
    private queueProvider: IQueueProvider
  ) {}
  async execute() {
    const scheduledEmails =
      await this.scheduledEmailsRepository.findAllUnsented();

    for (const scheduledEmail of scheduledEmails) {
      let hasItems = true;
      let lastItemId = undefined;
      const limit = 10;
      while (hasItems) {
        const emails: string[] = [];
        const subscribers = await this.subscriberRepository.findWithLimit({
          lastId: lastItemId,
          limit: limit,
        });
        if (!subscribers.length) break;
        for (const subscriber of subscribers) {
          emails.push(subscriber.email);
          lastItemId = subscriber.id;
        }
        await this.queueProvider.sendMessage({
          queue: process.env.SEND_MAIL_QUEUE!,
          body: {
            emails: emails,
            template: scheduledEmail.template,
            variables: scheduledEmail.variables,
          },
        });
      }
      await this.scheduledEmailsRepository.updateToSent({
        id: scheduledEmail.id,
      });
    }
  }
}
