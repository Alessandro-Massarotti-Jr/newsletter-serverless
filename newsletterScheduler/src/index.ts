import { sendScheduledEmailsUseCase } from "./domain/usecases/sendScheduledEmailsUseCase";

export async function handler(): Promise<void> {
  await sendScheduledEmailsUseCase.execute();
}
