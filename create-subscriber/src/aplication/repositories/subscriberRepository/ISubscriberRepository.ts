export interface ISubscriberRepository {
  create(data: { email: string }): Promise<void>;
}
