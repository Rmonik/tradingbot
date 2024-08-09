import { inject } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers";
import { IDatabase } from "../core/types";
import { ITransaction } from "./types";
import { Null } from "../utils/types";

export class TransactionRepository {
  constructor(@inject(ContainerIdentifiers.Database) private readonly db: IDatabase) { }

  public async insertTransaction(transaction: ITransaction): Promise<void> {
    await this.db.create("transactions", transaction);
  }

  public async getLastTransaction(): Promise<Null<ITransaction>> {
    const results: ITransaction[] = await this.db.findExtended("transactions", {}, { _id: -1}, 1);
    return results[0] ?? null;
  }
}