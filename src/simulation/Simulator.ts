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


@injectable()
export class Simulator {

  constructor(
    private readonly simulationPreparer: SimulationPreparer,
    private readonly userRepository: UserRepository,
    private readonly trader: Trader,
    private readonly taxCalculator: TaxCalculator,
    private readonly transactionRepository: TransactionRepository,
    private readonly simulationConfigProvider: SimulationConfigProvider,
  ) { }

  public async simulate(): Promise<void> {
    // Prepare simulation
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
    const user = await this.userRepository.findById(prepResult.userId);
    console.log(user?.balance);

    // Calculate tax
    const transactions = await this.transactionRepository.getAllTransactions(prepResult.userId);
    const tax = this.taxCalculator.calculateTax(transactions);
    console.log(tax);

  }
}