import { IPricePoint } from "../core/types.js";


export enum TransactionType {
  BUY = "buy",
  SELL = "sell"
}

export interface ITransaction {
  type: TransactionType;
  amount: number;
  price: number;
  date: Date;
}

export interface IOrder {
  type: TransactionType;
  amount: number;
}

export interface ITransactionExecutor {
  makeTransaction(order: IOrder, pricePoint: IPricePoint): Promise<void>;
}

export interface ITradingAlgorithm {
  determineTransaction(currentPrice: number, wallet: number, fiat: number, lastTransaction: ITransaction | null): IOrder | null;
}