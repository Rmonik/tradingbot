import { inject, injectable } from "inversify";
import { IBalance } from "../trading/types.js";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../core/types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { Null } from "../utils/types.js";


@injectable()
export class BalanceRepository {

  private readonly collectionName: string = "simulationBalance";
  public constructor(
    @inject(ContainerIdentifiers.Database) private readonly database: IDatabase,
  ) { }

  public async getBalance(): Promise<IBalance> {
    const result: Null<IBalance> = await this.database.execute(this.collectionName, coll => coll.findOne({}));
    if(!isDefined(result)) {
      throw new Error("Balance not found");
    }
    return result;
  }

  public async setBalance(balance: IBalance): Promise<void> {
    await this.database.execute(this.collectionName, coll => coll.updateOne({}, { $set: balance }, { upsert: true }));
  }
}