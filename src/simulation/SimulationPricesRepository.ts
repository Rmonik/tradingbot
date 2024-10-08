import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase, IPricePoint } from "../core/types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { Null } from "../utils/types.js";



@injectable()
export class SimulationPricesRepository {

  private readonly collectionName: string = "simulationPricePoints";

  public constructor(@inject(ContainerIdentifiers.Database) private readonly database: IDatabase) { }
  

  public async insertPrices(prices: IPricePoint[]): Promise<void> {
    await this.database.execute(this.collectionName, col => col.insertMany(prices));
  }

  public async getNextPricePointAfterDate(date: Date): Promise<Null<IPricePoint>> {
    return await this.database.execute(this.collectionName, col => col.findOne({ date: { $gt: date } }, { sort: { date: 1 } }));
  }

  public async createIndexes(): Promise<void> {
    await this.database.execute(this.collectionName, col => col.createIndex({ date: 1 }));
  }

  
}

interface IPricePointDb extends IPricePoint {
  _id: string;
}