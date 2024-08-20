import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase, IPricePoint } from "../core/types.js";
import { isDefined } from "../utils/TypeUtils.js";



@injectable()
export class SimulationPricesRepository {

  private readonly collectionName: string = "simulationPricePoints";

  public constructor(@inject(ContainerIdentifiers.Database) private readonly database: IDatabase) { }
  

  public async insertPrices(prices: IPricePoint[]): Promise<void> {
    for(const price of prices) {
      await this.database.create(this.collectionName, price);
    }
  }

  public async getAndDeleteNextPrice(): Promise<IPricePoint> {
    const pricePoint: IPricePointDb | undefined = (await this.database.findExtended(this.collectionName, {}, {date: 1}, 1))[0];
    if (!isDefined(pricePoint)) throw new Error("No more price points available");
    await this.database.delete(this.collectionName, {_id: pricePoint._id});
    return {
      date: pricePoint.date,
      price: pricePoint.price
    }
  }

  
}

interface IPricePointDb extends IPricePoint {
  _id: string;
}