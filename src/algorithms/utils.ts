import { ITransaction } from "../transactions/types.js";
import { Null } from "../utils/types.js";


export function getLastTransaction(transactions: ITransaction[]): Null<ITransaction> {
    if(transactions.length === 0) return null
    let currentLatest = transactions[0];
    for(let i = 1; i < transactions.length; i++) {
        if(transactions[i].date.getTime() > currentLatest.date.getTime()) currentLatest = transactions[i];
    }
    return currentLatest;
}