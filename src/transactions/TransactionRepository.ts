import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../core/types.js";
import { Null } from "../utils/types.js";
import { ITransaction } from "./types.js";

@injectable()
export class TransactionRepository {

  private collection = "transactions";
  
  public constructor(@inject(ContainerIdentifiers.Database) private readonly db: IDatabase) { }

  public async insertTransaction(transaction: ITransaction): Promise<void> {
    await this.db.execute(this.collection, col => col.insertOne(transaction));
  }

  public async getLastTransaction(): Promise<Null<ITransaction>> {
    return await this.db.execute<ITransaction>(this.collection, col => col.findOne({}, { sort: { date: -1 } }));
  }

  public async getAllTransactions(): Promise<ITransaction[]> {
    return await this.db.execute<ITransaction>(this.collection, col => col.find().toArray());
  }

}