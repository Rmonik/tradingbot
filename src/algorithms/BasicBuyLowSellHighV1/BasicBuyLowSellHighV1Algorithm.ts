import { inject, injectable } from "inversify";
import { IAlgorithm } from "../types.js";
import { IBasicBuyAndHoldV1Config } from "./types.js";
import { BasicBuyLowSellHighV1ConfigProvider } from "./BasicBuyLowSellHighV1ConfigProvider.js";
import { ITransaction, IOrder, TransactionType } from "../../transactions/types.js";
import { Null } from "../../utils/types.js";
import { isDefined } from "../../utils/TypeUtils.js";
import { getLastTransaction } from "../utils.js";


@injectable()
export class BasicBuyLowSellHighV1Algorithm implements IAlgorithm {


  public constructor (
    private readonly configProvider: BasicBuyLowSellHighV1ConfigProvider,
  ) {}

  public getConfig(): IBasicBuyAndHoldV1Config {
    return this.configProvider.getConfig();
  } 

  public describeAlgorithm(): string {
    return (
      `A basic buy-low-sell-high algorithm. The algorithm starts off by spending ${this.getConfig().initialBuyin * 100}% of fiat on an initial buy. `+
      `Then, algorithm sells ${this.getConfig().sellAmount*100}% of assets when the price has raised by ${this.getConfig().sellTreshold * 100}%. ` +
      `Or, it buys ${this.getConfig().buyAmount*100}% of remaining fiat worth when the price has lowered by ${this.getConfig().buyTreshold * 100}%.`
    );
  }

  public determineTransaction(currentPrice: number, wallet: number, fiat: number, transactionHistory: ITransaction[]): Null<IOrder> {
    const lastTransaction = getLastTransaction(transactionHistory);
    // Initial buy
    if(!isDefined(lastTransaction)) return {
      type: TransactionType.BUY,
      amount: fiat * this.getConfig().initialBuyin / currentPrice,
    }

    if(currentPrice > lastTransaction.price * (1 + this.getConfig().sellTreshold)) {
      
      return {
        type: TransactionType.SELL,
        amount: wallet * this.getConfig().sellAmount,
      }
    }
    
    if(currentPrice < lastTransaction.price * (1 - this.getConfig().buyTreshold)) {
      return {
        type: TransactionType.BUY,
        amount: (fiat * this.getConfig().buyAmount) / currentPrice,
      }
    }

    return null;
  }
  
}

