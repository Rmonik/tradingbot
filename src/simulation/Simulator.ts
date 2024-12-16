import { inject, injectable } from "inversify";
import { SimulationPreparer } from "./SimulationPreparer.js";
import { IBalance, ITrader } from "../trading/types.js";
import { Trader } from "../trading/Trader.js";
import { Null } from "../utils/types.js";
import { SimulationEndError } from "./errors/SimulationEndError.js";
import { TaxCalculator } from "../tax/TaxCalculator.js";
import { TransactionRepository } from "../transactions/TransactionRepository.js";
import { UserRepository } from "../users/UserRepository.js";
import { SimulationConfigProvider } from "./SimulationConfigProvider.js";
import { SimulationResultsService } from "./results/SimulationResultsService.js";
import { SimulationMode } from "./types.js";
import { SimulationDateProvider } from "./price/SimulationDateProvider.js";


@injectable()
export class Simulator {

  constructor(
    private readonly simulationPreparer: SimulationPreparer,
    private readonly trader: Trader,
    private readonly simulationConfigProvider: SimulationConfigProvider,
    private readonly simulationResultsService: SimulationResultsService,
    private readonly simulationDateProvider: SimulationDateProvider,
  ) { }

  public async simulate(): Promise<void> {
    const simulationLoops = this.simulationConfigProvider.getSimulationMode() === SimulationMode.Once ? 1 : this.simulationConfigProvider.getLoopsForRandomizedMode();
    for(let i = 0; i < simulationLoops; i++) {
      await this.simulateOnce();
    }
  }

  private async simulateOnce(): Promise<void> {
    // Prepare simulation
    await this.simulationDateProvider.resetDate();
    const asset = await this.simulationConfigProvider.getAsset();
    const prepResult: { userId: string } = await this.simulationPreparer.prepareSimulation();

    // Run simulation
    while(true) {
      try {
        await this.trader.trade(prepResult.userId, asset);
      }
      catch (err: any) {
        if (err instanceof SimulationEndError) {
          console.log(err.message);
          break;
        } else {
          throw err;
        }
      }
    }

    // Print & store results
    const simulationResults = await this.simulationResultsService.finalizeResults(prepResult.userId);
    console.log(simulationResults);
 
  }
}