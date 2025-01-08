import { inject, injectable } from "inversify";
import { IAlgorithm } from "../types.js";
import { IBasicBuyAndHoldNoRepeatsV1Config } from "./types.js";
import { ITransaction, IOrder, TransactionType } from "../../transactions/types.js";
import { Null } from "../../utils/types.js";
import { isDefined } from "../../utils/TypeUtils.js";
import { getLastTransaction } from "../utils.js";
import { BasicBuyLowSellHighNoRepeatsV1ConfigProvider } from "./BasicBuyLowSellHighNoRepeatsV1ConfigProvider.js";


@injectable()
export class BasicBuyLowSellHighNoRepeatsV1Algorithm implements IAlgorithm {


  public constructor (
    private readonly configProvider: BasicBuyLowSellHighNoRepeatsV1ConfigProvider,
  ) {}

  public getConfig(): IBasicBuyAndHoldNoRepeatsV1Config {
    return this.configProvider.getConfig();
  } 

  public describeAlgorithm(): string {
    return (
      `A basic buy-low-sell-high algorithm. The algorithm starts off by spending ${this.getConfig().initialBuyin * 100}% of fiat on an initial buy. `+
      `Then, algorithm sells ${this.getConfig().sellAmount*100}% of assets when the price has raised by ${this.getConfig().sellTreshold * 100}% since the last buy. ` +
      `Or, it buys ${this.getConfig().buyAmount*100}% of remaining fiat worth when the price has lowered by ${this.getConfig().buyTreshold * 100} since the last sell%.`
    );
  }

  public determineTransaction(currentPrice: number, wallet: number, fiat: number, transactionHistory: ITransaction[]): Null<IOrder> {
    const lastTransaction = getLastTransaction(transactionHistory);
    // Initial buy
    if(!isDefined(lastTransaction)) return {
      type: TransactionType.BUY,
      amount: fiat * this.getConfig().initialBuyin / currentPrice,
    }

    // Sell trigger
    if(lastTransaction.type === TransactionType.BUY && currentPrice > lastTransaction.price * (1 + this.getConfig().sellTreshold)) {
      
      return {
        type: TransactionType.SELL,
        amount: wallet * this.getConfig().sellAmount,
      }
    }
    
    // Buy trigger
    if(lastTransaction.type === TransactionType.SELL && currentPrice < lastTransaction.price * (1 - this.getConfig().buyTreshold)) {
      return {
        type: TransactionType.BUY,
        amount: (fiat * this.getConfig().buyAmount) / currentPrice,
      }
    }
    console.log(lastTransaction);
    return null;
  }
  
}

