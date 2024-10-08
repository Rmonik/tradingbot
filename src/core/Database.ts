import { inject, injectable } from "inversify";
import { Collection, Db, Document, MongoClient, Sort } from "mongodb";
import { IDatabase } from "./types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { ContainerIdentifiers } from "./Container/ContainerIdentifiers.js";


@injectable()
export class Database implements IDatabase {
  private  db: Db | undefined;
  private readonly client: MongoClient;
  public constructor(
    @inject(ContainerIdentifiers.DatabaseName) private readonly databaseName: string,
  ) {
    this.client = new MongoClient("mongodb://localhost:27018");
  }


  public async execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T>): Promise<T> {
    let result: T;
    try {
      await this.client.connect();
      const collectionInstance = this.client.db(this.databaseName).collection<T>(collection);
      result = await callback(collectionInstance);
    } finally {
      await this.client.close();
    }
    return result;
  }

}
