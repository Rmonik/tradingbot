import { inject, injectable, optional } from "inversify";
import { Admin, Collection, Db, Document, InsertManyResult, MongoClient, Sort } from "mongodb";
import { IDatabase } from "./types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { ContainerIdentifiers } from "./Container/ContainerIdentifiers.js";


@injectable()
export class Database implements IDatabase {

  // !!
  // These are static so the MongoClient keeps its connection pool open to all instances
  private static client: MongoClient | undefined;
  public static disposeConnection(): void {
    console.info("Disposing the database connection");
    if(isDefined(Database.client)) {
      Database.client.close();
      Database.client = undefined;
    }
  }

  public constructor(
    @optional() @inject(ContainerIdentifiers.DatabaseName) private readonly databaseName?: string,
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

  public async execute<T extends Document, R>(collection: string, callback: (collection: Collection<T>) => Promise<R>, database?: string): Promise<R>;
  public async execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | null>, database?: string): Promise<T | null>;
  public async execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T[]>, database?: string): Promise<T[]>;
  public async execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | T[] | null>, database?: string): Promise<T | null | T[]> {
    const dbName = database ?? this.databaseName;
    if(!isDefined(dbName)) throw new Error(`Database name is not defined; called with db: ${database}, this.databaseName: ${this.databaseName}`);
    return this.executeOnDb(dbName, collection, callback);
  }
  
  public async executeAdmin<T>(callback: (db: Admin) => Promise<T>): Promise<T | void> {
    try {
      const client: MongoClient = await this.getClient();
      const adminDb = client.db().admin();
      return callback(adminDb);
    } catch (error: unknown) {
      console.error("Something went wrong while executing an operation on the admin database", error);
      throw error;
    }
  }

  private async executeOnDb<T extends Document, R>(database: string, collection: string, callback: (collection: Collection<T>) => Promise<R>): Promise<R>;
  private async executeOnDb<T extends Document>(database: string, collection: string, callback: (collection: Collection<T>) => Promise<T | null>): Promise<T | null>;
  private async executeOnDb<T extends Document>(database: string, collection: string, callback: (collection: Collection<T>) => Promise<T[]>): Promise<T[]>;
  private async executeOnDb<T extends Document>(database:string, collection: string, callback: (collection: Collection<T>) => Promise<T | T[] | null>): Promise<T | null | T[]> {
    try {
      const client: MongoClient = await this.getClient();
      const collectionInstance = client.db(database).collection<T>(collection);
      const result = await callback(collectionInstance);
      return result;
    } catch (error: unknown) {
      console.error("Something went wrong while executing the database operation", error);
      throw error;
    }
  }

}
