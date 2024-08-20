import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { TransactionDeterminator } from "../transactions/TransactionDeterminator.js";
import { TransactionRepository } from "../transactions/TransactionRepository.js";
import { ITransactionExecutor } from "../transactions/types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { ITrader, IPriceChecker, IBalanceChecker } from "./types.js";


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
    const pricePoint = await this.priceChecker.checkPrice();
  
    // Check balance
    const balance = await this.balanceChecker.checkBalance();

    // Check last transaction
    const lastTransaction = await this.transactionRepository.getLastTransaction();

    // Make order
    const order = await this.transactionDeterminator.determineTransaction(pricePoint.price, balance.wallet, balance.fiat, lastTransaction);
    if(isDefined(order)) await this.transactionExecutor.makeTransaction(order, pricePoint);

  }
}