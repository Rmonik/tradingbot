import { ITransaction, TransactionType } from "../transactions/types.js";
import { Null } from "../utils/types.js";


export function getLastTransaction(transactionHistory: ITransaction[]): Null<ITransaction> {
    if(transactionHistory.length === 0) return null;
    const transactions  = sortTransactions(transactionHistory);
    return transactions[transactions.length - 1];
}

export function howManySellsSinceLastBuy(transactionHistory: ITransaction[]): number {
    if(transactionHistory.length === 0) return 0;
    const transactions  = sortTransactions(transactionHistory);

    let counter = 0;
    for(let i = transactions.length - 1; i >= 0; i--) {
        if(transactions[i].type === TransactionType.BUY) break;
        counter++;
    }
    return counter;

}

export function howManyBuysSinceLastSell(transactionHistory: ITransaction[]): number {
    if(transactionHistory.length === 0) return 0;
    const transactions  = sortTransactions(transactionHistory);

    let counter = 0;
    for(let i = transactions.length - 1; i >= 0; i--) {
        if(transactions[i].type === TransactionType.SELL) break;
        counter++;
    }
    return counter;

}

export function sortTransactions(transactions: ITransaction[]): ITransaction[] {
    return transactions.toSorted((t1, t2) => t1.date.getTime() - t2.date.getTime());
}