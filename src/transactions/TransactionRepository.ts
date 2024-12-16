import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../core/types.js";
import { Null } from "../utils/types.js";
import { ITransaction } from "./types.js";
import { ObjectId } from "mongodb";

@injectable()
export class TransactionRepository {

  private collection = "transactions";
  
  public constructor(@inject(ContainerIdentifiers.Database) private readonly db: IDatabase) { }

  public async insertTransaction(userId: string, transaction: ITransaction): Promise<void> {
    await this.db.execute(this.collection, col => col.insertOne({...transaction, userId: new ObjectId(userId)}));
  }

  public async getLastTransaction(userId: string): Promise<Null<ITransaction>> {
    return await this.db.execute<ITransaction>(this.collection, col => col.findOne({ userId: new ObjectId(userId)}, { sort: { date: -1 } }));
  }

  public async getAllTransactions(userId: string): Promise<ITransaction[]> {
    return await this.db.execute<ITransaction>(this.collection, col => col.find({ userId: new ObjectId(userId)}).toArray());
  }

  public async deleteAll(): Promise<void> {
    await this.db.execute(this.collection, col => col.deleteMany());
  }

  public async deleteAllButFromUser(userId: string): Promise<void> {
    await this.db.execute(this.collection, col => col.deleteMany({ userId: {$ne: new ObjectId(userId)}}));
  }

}