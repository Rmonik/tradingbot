import { Null } from "../utils/types";
import { isDefined } from "../utils/TypeUtils";
import { IOrder, ITransaction, TransactionType } from "./types";

export class TransactionDeterminator {

  public constructor() {

  }

  determineTransaction(currentPrice: number, wallet: number, fiat: number, lastTransaction: Null<ITransaction>): Null<IOrder> {
    if(!isDefined(lastTransaction)) return {
      type: TransactionType.BUY,
      amount: wallet * 0.5,
    }

    if(currentPrice > lastTransaction.price * 1.1) {
      return {
        type: TransactionType.SELL,
        amount: wallet * 0.1,
      }
    }
    
    if(currentPrice < lastTransaction.price * 0.9) {
      return {
        type: TransactionType.SELL,
        amount: fiat * 0.1,
      }
    }

    return null;
  }
  
}