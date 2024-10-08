import { injectable } from "inversify";
import { IPriceChecker } from "../trading/types.js";
import { SimulationPricesRepository } from "./SimulationPricesRepository.js";
import { IPricePoint } from "../core/types.js";
import { isDefined } from "../utils/TypeUtils.js";

@injectable()
export class PriceCheckerSimulation implements IPriceChecker {

  public constructor(
    private readonly simulationPricesRepository: SimulationPricesRepository,
  ) { }

  private lastCheckedDate: Date = new Date("1970-01-01");

  public async checkPrice(): Promise<IPricePoint> {
    const pricePoint = await this.simulationPricesRepository.getNextPricePointAfterDate(this.lastCheckedDate);
    if(!isDefined(pricePoint)) {
      throw new Error("Price not found");
    }
    this.lastCheckedDate = pricePoint.date;
    return pricePoint;
  }

}