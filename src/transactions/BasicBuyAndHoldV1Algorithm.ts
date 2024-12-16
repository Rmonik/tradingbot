import { injectable } from "inversify";
import { Null } from "../utils/types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { ITransaction, IOrder, TransactionType, ITradingAlgorithm } from "./types.js";


@injectable()
export class BasicBuyAndHoldV1Algorithm implements ITradingAlgorithm {

  public constructor() {

  }

  public readonly config = {
    initialBuyin: 0.6,
    sellTreshold: 0.10,
    sellAmount: 0.05,
    buyTreshold: 0.05,
    buyAmount: 0.05,

  } as const;

  public describeAlgorithm(): string {
    return (
      `A basic buy-low-sell-high algorithm. The algorithm starts off by spending ${this.config.initialBuyin * 100}% of fiat on an initial buy. `+
      `Then, algorithm sells ${this.config.sellAmount*100}% of assets when the price has raised by ${this.config.sellTreshold * 100}%. ` +
      `Or, it buys ${this.config.buyAmount*100}% of remaining fiat worth when the price has lowered by ${this.config.buyTreshold*100}%.`
    );
  }

  public determineTransaction(currentPrice: number, wallet: number, fiat: number, lastTransaction: Null<ITransaction>): Null<IOrder> {

    // Initial buy
    if(!isDefined(lastTransaction)) return {
      type: TransactionType.BUY,
      amount: fiat * this.config.initialBuyin / currentPrice,
    }

    if(currentPrice > lastTransaction.price * (1 + this.config.sellTreshold)) {
      
      return {
        type: TransactionType.SELL,
        amount: wallet * this.config.sellAmount,
      }
    }
    
    if(currentPrice < lastTransaction.price * (1 - this.config.buyTreshold)) {
      return {
        type: TransactionType.BUY,
        amount: (fiat * this.config.buyAmount) / currentPrice,
      }
    }

    return null;
  }
  
}