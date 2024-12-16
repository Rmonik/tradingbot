import { injectable } from "inversify";
import { Asset, IPricePoint } from "../../core/types.js";
import { IPriceChecker } from "../../trading/types.js";
import { isDefined } from "../../utils/TypeUtils.js";
import { SimulationEndError } from "../errors/SimulationEndError.js";
import { SimulationConfigProvider } from "../SimulationConfigProvider.js";
import { SimulationPricesRepository } from "../SimulationPricesRepository.js";
import { SimulationDateProvider } from "./SimulationDateProvider.js";

@injectable()
export class PriceCheckerSimulation implements IPriceChecker {


  public constructor(
    private readonly simulationPricesRepository: SimulationPricesRepository,
    private readonly simulationConfigProvider: SimulationConfigProvider,
    private dateProvider: SimulationDateProvider,
  ) { }


  public async checkPrice(asset: Asset): Promise<IPricePoint> {
    const pricePoint = await this.simulationPricesRepository.getNextPricePointAfterDate(asset, this.dateProvider.getCurrentDate());
    if(!isDefined(pricePoint) || pricePoint.date >= this.simulationConfigProvider.getSimulationInterval().end) {
      throw new SimulationEndError("No more price points in interval");
    }
    this.dateProvider.setDate(pricePoint.date);
    return pricePoint;
  }

}