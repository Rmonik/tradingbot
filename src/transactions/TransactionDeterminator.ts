import { injectable } from "inversify";
import { Null } from "../utils/types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { ITransaction, IOrder, TransactionType } from "./types.js";


@injectable()
export class TransactionDeterminator {

  public constructor() {

  }

  determineTransaction(currentPrice: number, wallet: number, fiat: number, lastTransaction: Null<ITransaction>): Null<IOrder> {
    if(!isDefined(lastTransaction)) return {
      type: TransactionType.BUY,
      amount: fiat * 0.5 / currentPrice,
    }

    if(currentPrice > lastTransaction.price * 1.1) {
      return {
        type: TransactionType.SELL,
        amount: wallet * 0.1,
      }
    }
    
    if(currentPrice < lastTransaction.price * 0.9) {
      return {
        type: TransactionType.BUY,
        amount: wallet * 0.1,
      }
    }

    return null;
  }
  
}