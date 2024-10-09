import { injectable } from 'inversify';
import { ITransaction, TransactionType } from '../transactions/types.js';
import { Queue } from '../utils/Queue.js';
import { Stack } from '../utils/Stack.js';
import { isDefined } from '../utils/TypeUtils.js';
import { TaxConfigProvider } from './TaxConfigProvider.js';
import { ITaxCalculationResult, TaxMethod } from './types.js';

/** @todo abstract the getting of the next asset away so the logic doesn't need to be copied */
@injectable()
export class TaxCalculator {

  public constructor(
    private readonly TaxConfigProvider: TaxConfigProvider,
  ) { }

  public calculateTax(transactionHistory: ITransaction[]): ITaxCalculationResult {
    const transactions = [...transactionHistory];
    const assets = transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    if(this.TaxConfigProvider.getConfig().taxMethod === TaxMethod.FIFO) {
      return this.calculateFIFO(assets);
    } else if(this.TaxConfigProvider.getConfig().taxMethod === TaxMethod.LIFO) {
      return this.calculateLIFO(assets);
    }
    throw new Error("Unknown tax method");
  }


  private calculateFIFO(transactions: ITransaction[]): ITaxCalculationResult {
    const assetsQueue = new Queue<IAsset>();

    let profit = 0;
    for(const transaction of transactions) {
      // If it's a BUY transaction, add it to the queue
      if(transaction.type === TransactionType.BUY) {
        const asset = { amount: transaction.amount, price: transaction.price };
        assetsQueue.enqueue(asset);

      // If it's a SELL transaction, calculate the profit
      } else {
        let amountLeftToSell = transaction.amount;
        while(amountLeftToSell > 0) {
          const asset = assetsQueue.front();
          if (!isDefined(asset)) {
            throw new Error("Cannot calculate tax -- More assets sold than bought");
          }
          if(asset.amount > amountLeftToSell) {
            profit += (transaction.price - asset.price) * amountLeftToSell;
            amountLeftToSell = 0;
            assetsQueue.front()!.amount -= amountLeftToSell;
          } else {
            profit += (transaction.price - asset.price) * asset.amount;
            amountLeftToSell -= asset.amount;
            assetsQueue.dequeue();
          }
        }
      }
      
    }

    return {
      taxableProfit: profit,
      taxAmount: profit * this.TaxConfigProvider.getConfig().taxRate,
    }

  }

  private calculateLIFO(transactions: ITransaction[]): ITaxCalculationResult {
    const assetsQueue = new Stack<IAsset>();

    let profit = 0;
    for(const transaction of transactions) {
      // If it's a BUY transaction, add it to the queue
      if(transaction.type === TransactionType.BUY) {
        const asset = { amount: transaction.amount, price: transaction.price };
        assetsQueue.push(asset);

      // If it's a SELL transaction, calculate the profit
      } else {
        let amountLeftToSell = transaction.amount;
        while(amountLeftToSell > 0) {
          const asset = assetsQueue.peek();
          if (!isDefined(asset)) {
            throw new Error("Cannot calculate tax -- More assets sold than bought");
          }
          if(asset.amount > amountLeftToSell) {
            profit += (transaction.price - asset.price) * amountLeftToSell;
            amountLeftToSell = 0;
            assetsQueue.peek()!.amount -= amountLeftToSell;
          } else {
            profit += (transaction.price - asset.price) * asset.amount;
            amountLeftToSell -= asset.amount;
            assetsQueue.pop();
          }
        }
      }
      
    }

    return {
      taxableProfit: profit,
      taxAmount: profit * this.TaxConfigProvider.getConfig().taxRate,
    }

  }


}

interface IAsset {
  amount: number;
  price: number;
}
