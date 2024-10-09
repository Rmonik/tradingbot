import { inject, injectable } from "inversify";
import { SimulationPreparer } from "./SimulationPreparer.js";
import { BalanceRepository } from "./balance/BalanceRepository.js";
import { IBalance, ITrader } from "../trading/types.js";
import { Trader } from "../trading/Trader.js";
import { Null } from "../utils/types.js";
import { SimulationEndError } from "./errors/SimulationEndError.js";
import { TaxCalculator } from "../tax/TaxCalculator.js";
import { TransactionRepository } from "../transactions/TransactionRepository.js";


@injectable()
export class Simulator {

  constructor(
    private readonly simulationPreparer: SimulationPreparer,
    private readonly balanceRepository: BalanceRepository,
    private readonly trader: Trader,
    private readonly taxCalculator: TaxCalculator,
    private readonly transactionRepository: TransactionRepository,
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
        if (err instanceof SimulationEndError) {
          console.log(err.message);
          break;
        } else {
          throw err;
        }
      }
    }

    // Print & store results
    const balance: Null<IBalance> = await this.balanceRepository.getBalance();
    console.log(balance);

    // Calculate tax
    const transactions = await this.transactionRepository.getAllTransactions();
    const tax = this.taxCalculator.calculateTax(transactions);
    console.log(tax);

  }
}