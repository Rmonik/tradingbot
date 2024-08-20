import { injectable } from "inversify";
import { IPriceChecker } from "../trading/types.js";
import { SimulationPricesRepository } from "./SimulationPricesRepository.js";
import { IPricePoint } from "../core/types.js";

@injectable()
export class PriceCheckerSimulation implements IPriceChecker {

  public constructor(
    private readonly simulationPricesRepository: SimulationPricesRepository,
  ) { }

  public async checkPrice(): Promise<IPricePoint> {
    const pricePoint = await this.simulationPricesRepository.getAndDeleteNextPrice();
    return pricePoint;
  }

}