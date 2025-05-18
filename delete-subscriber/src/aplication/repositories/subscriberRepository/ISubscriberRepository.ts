export interface ISubscriberRepository {
  delete(data: { id: string }): Promise<void>;
}
