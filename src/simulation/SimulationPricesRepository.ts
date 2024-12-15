import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { Asset, IDatabase, IPricePoint } from "../core/types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { Null } from "../utils/types.js";



@injectable()
export class SimulationPricesRepository {

  private readonly collectionName: string = "simulationPricePoints";

  public constructor(@inject(ContainerIdentifiers.Database) private readonly database: IDatabase) { }
  

  public async insertPrices(prices: IPricePoint[]): Promise<void> {
    await this.database.execute(this.collectionName, col => col.insertMany(prices));
  }

  public async getNextPricePointAfterDate(asset: Asset, date: Date): Promise<Null<IPricePoint>> {
    return await this.database.execute<IPricePoint>(this.collectionName, col => col.findOne({ date: { $gt: date }, asset: asset }, { sort: { date: 1 } }));
  }

  public async assetAlreadyExists(asset: Asset): Promise<boolean> {
    const result = await this.getNextPricePointAfterDate(asset, new Date(1900, 0, 1));
    return isDefined(result);
  }

  /* @todo: move this to migrations/db init */
  public async createIndexes(): Promise<void> {
    await this.database.execute(this.collectionName, col => col.createIndex({ date: 1 }));
  }

}
