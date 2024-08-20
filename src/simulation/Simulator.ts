import { inject, injectable } from "inversify";
import { SimulationPreparer } from "./SimulationPreparer.js";
import { BalanceRepository } from "./BalanceRepository.js";
import { IBalance, ITrader } from "../trading/types.js";
import { Trader } from "../trading/Trader.js";


@injectable()
export class Simulator {

  constructor(
    private readonly simulationPreparer: SimulationPreparer,
    private readonly balanceRepository: BalanceRepository,
    private readonly trader: Trader,
  ) { }

  public async simulate(): Promise<void> {
    // Prepare simulation
    await this.simulationPreparer.prepareSimulation();

    // Run simulation
    while(true) {
      try {
        await this.trader.trade();
      }
      catch (err: any) {
        console.log(err.message);
        break;
      }
    }

    // Print & store results
    const balance: IBalance = await this.balanceRepository.getBalance();
    console.log(balance);

  }
}