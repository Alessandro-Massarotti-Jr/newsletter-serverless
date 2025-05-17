import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { z } from "zod";
import { MongoSubscriberRepository } from "./aplication/repositories/subscriberRepository/implementations/MongoSubscriberRepository";

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const createSubscriberSchema = z.object({
      email: z.string().email(),
    });
    const result = createSubscriberSchema.parse(body);
    const repository = new MongoSubscriberRepository(
      process.env.MONGO_DB_DATABASE!,
      process.env.MONGO_DB_COLLECTION!
    );
    await repository.create(result);
    return {
      statusCode: 204,
      body: "",
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
}
