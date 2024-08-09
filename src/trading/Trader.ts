import { inject, injectable } from "inversify";
import { IBalanceChecker, IPriceChecker, ITrader } from "./types";
import { ITransactionExecutor } from "../transactions/types";
import { TransactionDeterminator } from "../transactions/TransactionDeterminator";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers";
import { isDefined } from "../utils/TypeUtils";
import { TransactionRepository } from "../transactions/TransactionRepository";

@injectable()
export class Trader implements ITrader {

  public constructor(
    @inject(ContainerIdentifiers.PriceChecker) private readonly priceChecker: IPriceChecker,
    @inject(ContainerIdentifiers.BalanceChecker) private readonly balanceChecker: IBalanceChecker,
    private readonly transactionDeterminator: TransactionDeterminator,
    @inject(ContainerIdentifiers.TransactionExecutor) private readonly transactionExecutor: ITransactionExecutor,
    private readonly transactionRepository: TransactionRepository,
  ) {

  }

  public async trade(): Promise<void> {
    // Check price
    const price = await this.priceChecker.checkPrice();
  
    // Check balance
    const balance = await this.balanceChecker.checkBalance();

    // Check last transaction
    const lastTransaction = await this.transactionRepository.getLastTransaction();

    // Make order
    const order = await this.transactionDeterminator.determineTransaction(price, balance.wallet, balance.fiat, lastTransaction);
    if(isDefined(order)) await this.transactionExecutor.makeTransaction(order);

  }
}