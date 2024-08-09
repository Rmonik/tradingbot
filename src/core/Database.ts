import { inject, injectable } from "inversify";
import { Db, MongoClient, Sort } from "mongodb";
import { isDefined } from "../utils/TypeUtils";
import { ContainerIdentifiers } from "./Container/ContainerIdentifiers";
import { IDatabase } from "./types";

const connection: MongoClient = new MongoClient("mongodb://localhost:27018");

@injectable()
export class Database implements IDatabase {
  private  db: Db | undefined;
  public constructor(
    @inject(ContainerIdentifiers.DatabaseName) private readonly databaseName: string,
  ) { }


  private async connect( ) {
    await connection.connect();
    this.db = connection.db(this.databaseName);
  }

  private async getDb(): Promise<Db> {
    if(!isDefined(this.db)) await this.connect();
    return this.db!;
  }

  public async find(collection: string, filter: object): Promise<object[]>  {
    const db = await this.getDb();
    const coll = db.collection(collection);
    return await coll.find(filter).toArray()
  }

  public async findExtended(collection: string, filter: object, sort?: Sort, limit?: number): Promise<any[]> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    const cursor = coll.find(filter);
    if(isDefined(sort) && isDefined(limit)) {
      return await cursor.sort(sort).limit(limit).toArray();
    } 
    if(isDefined(sort)) {
      return await cursor.sort(sort).toArray();
    } 
    if(isDefined(limit)) {
      return await cursor.limit(limit).toArray();
    } 
    return await coll.find(filter).toArray()  
  }

  public async create(collection: string, document: object ): Promise<void> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    await coll.insertOne(document);
  }

  public async update(collection: string, filter: object, update: object ): Promise<void> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    await coll.updateMany(filter, update);
  }

  public async delete(collection: string, filter: object ): Promise<void> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    await coll.deleteMany(filter);
  }
}