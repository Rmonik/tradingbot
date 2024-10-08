import { inject, injectable } from "inversify";
import { Collection, Db, Document, MongoClient, Sort } from "mongodb";
import { IDatabase } from "./types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { ContainerIdentifiers } from "./Container/ContainerIdentifiers.js";


@injectable()
export class Database implements IDatabase {
  private static client: MongoClient | undefined;
  public static disposeConnection(): void {
    console.info("Disposing the database connection");
    if(isDefined(Database.client)) {
      Database.client.close();
      Database.client = undefined;
    }
  }
  public constructor(
    @inject(ContainerIdentifiers.DatabaseName) private readonly databaseName: string,
  ) {
    Database.client = new MongoClient("mongodb://localhost:27018");
  }

  private async getClient(): Promise<MongoClient> {
    if(!isDefined(Database.client)) {
      Database.client = new MongoClient("mongodb://localhost:27018");
      await Database.client.connect();
    }
    return Database.client;
  }

  public async execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | null>): Promise<T | null> {
    let result: T | null;
    const client = await this.getClient();
    try {
      const collectionInstance = client.db(this.databaseName).collection<T>(collection);
      result = await callback(collectionInstance);
      return result;
    } catch (error: unknown) {
      console.error("Something went wrong while executing the database operation", error);
      throw error;
    }
  }

}
