export interface IQueueProvider {
  sendMessage(data: { queue: string; body: Object }): Promise<void>;
}
