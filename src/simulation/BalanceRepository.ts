import { inject, injectable } from "inversify";
import { IBalance } from "../trading/types.js";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../core/types.js";
import { isDefined } from "../utils/TypeUtils.js";


@injectable()
export class BalanceRepository {

  private readonly collectionName: string = "simulationBalance";
  public constructor(
    @inject(ContainerIdentifiers.Database) private readonly database: IDatabase,
  ) { }

  public async getBalance(): Promise<IBalance> {
    return (await this.database.find(this.collectionName, {}))[0];
  }

  public async setBalance(balance: IBalance): Promise<void> {
    const currentBalance: IBalance = (await this.database.find(this.collectionName, {}))[0];
    if(!isDefined(currentBalance)) {
      await this.database.create(this.collectionName, balance);
    } else {
      await this.database.replace(this.collectionName, balance);
    }
  }
}