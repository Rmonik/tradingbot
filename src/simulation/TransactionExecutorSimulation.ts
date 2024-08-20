import { injectable } from "inversify";
import { ITransactionExecutor, IOrder, TransactionType } from "../transactions/types.js";
import { IPricePoint } from "../core/types.js";
import { BalanceCheckerSimulation } from "./BalanceCheckerSimulation.js";
import { BalanceRepository } from "./BalanceRepository.js";
import { IBalance } from "../trading/types.js";
import { FeeProvider } from "./FeeProvider.js";
import { IFee } from "./types.js";
import { TransactionRepository } from "../transactions/TransactionRepository.js";

@injectable()
export class TransactionExecutorSimulation implements ITransactionExecutor {

  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly balanceRepository: BalanceRepository,
    private readonly feeProvider: FeeProvider,
  ) { }

  public async makeTransaction(order: IOrder, pricePoint: IPricePoint): Promise<void> {
    // Store transaction
    await this.transactionRepository.insertTransaction({
      type: order.type,
      amount: order.amount,
      price: pricePoint.price,
      date: pricePoint.date,
    });

    // Calculate new balance
    const oldBalance = await this.balanceRepository.getBalance();
    const newBalance = await this.calculateNewBalance(oldBalance, order, pricePoint);
    await this.balanceRepository.setBalance(newBalance);
  }



  private calculateNewBalance(oldBalance: IBalance, order: IOrder, pricePoint: IPricePoint): IBalance { 
    const fees: IFee = this.feeProvider.getFee();
    if(order.type === TransactionType.BUY) {
      const newWallet = oldBalance.wallet + order.amount;
      const totalPrice = order.amount * pricePoint.price;
      const newFiat = oldBalance.fiat - totalPrice - fees.taker * totalPrice;
      return { fiat: newFiat, wallet: newWallet };
    } else {
      const newWallet = oldBalance.wallet - order.amount;
      const totalPrice = order.amount * pricePoint.price;
      const newFiat = oldBalance.fiat + totalPrice - fees.taker * totalPrice;
      return { fiat: newFiat, wallet: newWallet };
    }
  }
}
