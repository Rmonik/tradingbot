import { inject, injectable, tagged } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { TransactionRepository } from "../transactions/TransactionRepository.js";
import { ITransactionExecutor } from "../transactions/types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { ITrader, IPriceChecker, IBalance } from "./types.js";
import { UserRepository } from "../users/UserRepository.js";
import { Asset } from "../core/types.js";
import { IAlgorithm } from "../algorithms/types.js";


@injectable()
export class Trader implements ITrader {

  public constructor(
    @inject(ContainerIdentifiers.PriceChecker) private readonly priceChecker: IPriceChecker,
    @inject(ContainerIdentifiers.TradingAlgorithm) private readonly transactionDeterminator: IAlgorithm,
    @inject(ContainerIdentifiers.TransactionExecutor) private readonly transactionExecutor: ITransactionExecutor,
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
  ) {

  }

  public async trade(userId: string, asset: Asset): Promise<void> {
    // Check price
    const pricePoint = await this.priceChecker.checkPrice(asset);
  
    // Check balance
    const user = await this.userRepository.findById(userId);
    if(!isDefined(user)) throw new Error(`Could not find user with id ${userId}`);
    const balance: IBalance = user.balance;

    // Check last transaction
    const lastTransaction = await this.transactionRepository.getLastTransaction(userId);

    // Make order
    const order = await this.transactionDeterminator.determineTransaction(pricePoint.price, balance.wallet, balance.fiat, lastTransaction);
    if(isDefined(order)) await this.transactionExecutor.makeTransaction(userId, order, pricePoint);

  }

}