import { inject, injectable } from "inversify";
import { IPricePoint } from "../../core/types.js";
import { IBalance } from "../../trading/types.js";
import { TransactionRepository } from "../../transactions/TransactionRepository.js";
import { ITransactionExecutor, IOrder, TransactionType } from "../../transactions/types.js";
import { SimulationConfigProvider } from "../SimulationConfigProvider.js";
import { IFee } from "../types.js";
import { ContainerIdentifiers } from "../../core/Container/ContainerIdentifiers.js";
import { DateService } from "../../core/DateService.js";
import { UserRepository } from "../../users/UserRepository.js";
import { isDefined } from "../../utils/TypeUtils.js";


@injectable()
export class TransactionExecutorSimulation implements ITransactionExecutor {

  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly simulationConfigProvider: SimulationConfigProvider,
    private readonly dateService: DateService,
    private readonly userRepository: UserRepository,
  ) { }

  public async makeTransaction(userId: string, order: IOrder, pricePoint: IPricePoint): Promise<void> {
    // Calculate new balance and validate

    // Store transaction
    await this.transactionRepository.insertTransaction(userId, {
      type: order.type,
      amount: order.amount,
      price: pricePoint.price,
      date: pricePoint.date,
    });

    // Calculate new balance
    const user = await this.userRepository.findById(userId);
    if(!isDefined(user)) throw new Error("Could not find user");
    const oldBalance = user.balance;
    const newBalance = this.calculateNewBalance(oldBalance, order, pricePoint);
    await this.userRepository.setBalance(userId, newBalance);
  }



  private calculateNewBalance(oldBalance: IBalance, order: IOrder, pricePoint: IPricePoint): IBalance { 
    
    const fees: IFee = this.simulationConfigProvider.getFee();

    if(order.type === TransactionType.BUY) {
      const newWallet = oldBalance.wallet + order.amount;
      const totalPrice = order.amount * pricePoint.price;
      const newFiat = oldBalance.fiat - totalPrice - fees.taker * totalPrice;
      
      if(newFiat < 0) {
        throw new Error(`Buy order cannot be completed: Not enough fiat. Trying to buy ${totalPrice} worth plus ${fees.taker * totalPrice} fee with only ${oldBalance.fiat}`);
      }

      return { fiat: newFiat, wallet: newWallet, modifiedOn: this.dateService.getNow() };
    } else {
      const newWallet = oldBalance.wallet - order.amount;

      if(newWallet < 0) throw new Error("Sell order cannot be completed: Not enough assets");
      const totalPrice = order.amount * pricePoint.price;
      const newFiat = oldBalance.fiat + totalPrice - fees.taker * totalPrice;
      return { fiat: newFiat, wallet: newWallet, modifiedOn: this.dateService.getNow() };
    }
  }

}
