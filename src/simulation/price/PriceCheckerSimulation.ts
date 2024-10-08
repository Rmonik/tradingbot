import { injectable } from "inversify";
import { IPricePoint } from "../../core/types.js";
import { IPriceChecker } from "../../trading/types.js";
import { isDefined } from "../../utils/TypeUtils.js";
import { SimulationEndError } from "../errors/SimulationEndError.js";
import { SimulationConfigProvider } from "../SimulationConfigProvider.js";
import { SimulationPricesRepository } from "../SimulationPricesRepository.js";

@injectable()
export class PriceCheckerSimulation implements IPriceChecker {

  private lastCheckedDate: Date ;

  public constructor(
    private readonly simulationPricesRepository: SimulationPricesRepository,
    private readonly simulationConfigProvider: SimulationConfigProvider,
  ) { 
    this.lastCheckedDate = this.simulationConfigProvider.getSimulationInterval().start;
  }


  public async checkPrice(): Promise<IPricePoint> {
    const pricePoint = await this.simulationPricesRepository.getNextPricePointAfterDate(this.lastCheckedDate);
    if(!isDefined(pricePoint) || pricePoint.date >= this.simulationConfigProvider.getSimulationInterval().end) {
      throw new SimulationEndError("No more price points in interval");
    }
    this.lastCheckedDate = pricePoint.date;
    return pricePoint;
  }

}