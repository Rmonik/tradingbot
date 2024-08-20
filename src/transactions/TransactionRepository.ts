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
    await this.db.create(this.collection, transaction);
  }

  public async getLastTransaction(): Promise<Null<ITransaction>> {
    const results: ITransaction[] = await this.db.findExtended(this.collection, {}, { _id: -1}, 1);
    return results[0] ?? null;
  }
}