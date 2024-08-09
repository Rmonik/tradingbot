

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
  makeTransaction(order: IOrder): Promise<void>;

}