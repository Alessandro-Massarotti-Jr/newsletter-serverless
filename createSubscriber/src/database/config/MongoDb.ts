import mongoose from "mongoose";

export class MongoDbBase {
  protected collection = "";

  constructor(database: string, collection: string) {
    if (database.trim().length <= 0 || collection.trim().length <= 0) {
      throw new Error("Please, check your mongo connection variables.");
    }

    this.openConnection(process.env.MONGO_DB_URL!, database);
    this.collection = collection;
  }

  private async openConnection(url: string, dbName: string) {
    if (dbName.trim().length <= 0) {
      throw new Error("Database name is not defined.");
    }

    mongoose
      .connect(url, {
        dbName: dbName,
      })
      .catch((error) => {
        if (error) {
          throw new Error(error.message);
        }
      });
  }

  async closeConnection(): Promise<void> {
    await mongoose.connection.close();
    return;
  }
}
